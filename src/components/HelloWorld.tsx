import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { fetchWorks, worksSelector } from '../slices/works';
import './HelloWorld.scss'
import { Author } from "../models/Author";
import { ExpandLevel } from "../models/Misc";
import { Work } from "../models/Work";
import { debounce } from "lodash";
import { SearchCard } from "./SearchCard";
import { ShimmerThumbnail  } from "react-shimmer-effects";


const HelloWorld = () =>
{

  const dispatch: any = useDispatch();
  const { works, loadingWorks, worksHasErrors } = 
    useSelector(worksSelector);

  useEffect(() =>
  {
    dispatch(fetchWorks())
  }, [dispatch])

  
  return (
    <div className="container">

      <nav>

        <div className="searchbox">

          <input placeholder="Quick search..." className="searchbox_searchbar" />

          <div className="searchbox_searchResults">
            {works?.map((work: Work) => {
              return (
                <SearchCard work={work} />
              )
            })}
            {[...Array(5)].map((i) => {
              return (
              <ShimmerThumbnail 
                height={60}
                // width={36} 
                // rounded
              />
            )})}  



          </div>

          



          

        </div>

      </nav>


       
     </div>
  );

}

export default HelloWorld;