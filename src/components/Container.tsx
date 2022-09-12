import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { fetchWorks, worksSelector } from '../slices/works';
import './Container.scss'
import { Work } from "../models/Work";
import { debounce, uniqueId } from "lodash";
import { ShimmerThumbnail  } from "react-shimmer-effects";
import { Constants } from "../common/Constants";
import { SearchCardResults } from "./SearchCardResults/SearchResults";

const HelloWorld = () =>
{

  const dispatch: any = useDispatch();
  const [searchTerm, setSearchTerm] = React.useState("");
  const { works, loading, worksHasErrors } = useSelector(worksSelector);
//
  useEffect(() =>
  {
    dispatch(fetchWorks(searchTerm))
  }, [searchTerm])

  return (
    <div className="container">

      {/* Navbar */}
      <nav>
        <h1>Search for books...</h1>
        <div className="searchbox">

          {/* Searchbox */}
          <input 
            placeholder={Constants.SEARCHBOX_PLACEHOLDER} 
            className="searchbox_searchbar" 
            onChange={debounce((e: any) => setSearchTerm(state => e.target.value), Constants.DEBOUNCE_TIME_MILLISECONDS)}
          />

          {/* Search results */}  
          <SearchCardResults 
            work={works}
            searchTerm={searchTerm} 
          />

        </div>
      </nav>

     </div>
  );

}

export default HelloWorld;