import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { fetchRecipes, recipesSelector } from '../slices/recipes'



import './HelloWorld.scss'
import { Author } from "../models/Author";
import { ExpandLevel } from "../models/Misc";
import { Work } from "../models/Work";
import { debounce } from "lodash";

const HelloWorld = () =>
{

  const dispatch: any = useDispatch()
  const { recipes, loading, hasErrors } = useSelector(recipesSelector);

  useEffect(() =>
  {
    dispatch(fetchRecipes())
  }, [dispatch])

  const renderRecipes = () =>
  {
    if (loading) return <p>Loading recipes...</p>
    if (hasErrors) return <p>Cannot display recipes...</p>

    return recipes.map((recipe: any) =>
      <div key={recipe.idMeal} className='tile'>
        <h2>{recipe.strMeal}</h2>
        <img src={recipe.strMealThumb} alt='' />
      </div>
    )
  }

  return (
    <section>
      <h1>Cum</h1>
      <div className='content'>
        {renderRecipes()}
      </div>
    </section>
  )
}






export default HelloWorld;
