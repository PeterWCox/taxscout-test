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
  const [searchTerm, setSearchTerm] = React.useState("");
  const { works, loading, worksHasErrors } = useSelector(worksSelector);

  useEffect(() =>
  {
    dispatch(fetchWorks(searchTerm))
  }, [searchTerm])

  return (
    <div className="container">
      <nav>
        <div className="searchbox">

          {/* Searchbox */}
          <input 
            placeholder="Quick search..." 
            className="searchbox_searchbar" 
            onChange={debounce((e: any) => setSearchTerm(state => e.target.value), 250)}
          />
          
          {searchTerm?.trim() !== "" && <div className="searchbox_searchResults searchbox_searchResultsMinimumWidth">
           
            {/* Search Cards */}
            {works?.map((work: Work) => {
              return (
                <SearchCard 
                  key={work.workid}
                  work={work} 
                />
              )
            })}

            {/* Shimmers */}
            {loading && [...Array(3)].map((i) => {
                return (
                <ShimmerThumbnail 
                  height={60}
                />
            )})} 
           
          </div>
          }

         

          
    
        </div>
      </nav>

      <h1>{searchTerm}</h1>

      {/* <div>{worksHasErrors.toString()}</div>
      <div>{loading.toString()}</div> */}

     </div>
  );

}

export default HelloWorld;