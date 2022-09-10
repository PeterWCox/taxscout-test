import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { fetchRecipes, recipesSelector } from '../slices/recipes'
import { fetchWorks, worksSelector } from '../slices/works';
import './HelloWorld.scss'
import { Author } from "../models/Author";
import { ExpandLevel } from "../models/Misc";
import { Work } from "../models/Work";
import { debounce } from "lodash";

const HelloWorld = () =>
{

  const dispatch: any = useDispatch();

  const { recipes, loadingRecipes, recipesHasErrors } = useSelector(recipesSelector);
  const { works, loadingWorks, worksHasErrors } = useSelector(worksSelector);


  useEffect(() =>
  {
    dispatch(fetchWorks())
    dispatch(fetchRecipes())
  }, [dispatch])

  const renderRecipes = () =>
  {
    if (loadingRecipes) return <p>Loading recipes..</p>
    if (recipesHasErrors) return <p>Cannot display recipes...</p>

    return recipes.map((recipe: any) =>
      <div key={recipe.idMeal} className='tile'>
        <h2>{recipe.strMeal}</h2>
      </div>
    )
  }

  const renderWorks = () =>
  {
    if (loadingWorks) return <p>Loading works...</p>
    if (worksHasErrors) return <p>Cannot display works...</p>

    return works.map((work: Work) => {
      return (
        <p>
          {work.titleAuth}
        </p>
        )
      });
  }


  return (
    <section>
      <h1>Hello</h1>
      <div className='content'>
        {renderWorks()}      
      </div>
    </section>
  )
}






export default HelloWorld;
