import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { fetchWorks, worksSelector } from '../slices/works';
import './Container.scss'
import { Author } from "../models/Author";
import { ExpandLevel } from "../models/Misc";
import { Work } from "../models/Work";
import { debounce, uniqueId } from "lodash";
import { SearchCard } from "./SearchCard";
import { ShimmerThumbnail  } from "react-shimmer-effects";
import { SearchResults } from "./SearchResults";
import { Constants } from "../common/Constants";

const HelloWorld = () =>
{

  const dispatch: any = useDispatch();
  const [searchTerm, setSearchTerm] = React.useState("");
  const { works, loading, worksHasErrors } = useSelector(worksSelector);
  const [isSearchResultsDisplayed, setIsSearchResultsDisplayed] = React.useState(false);

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
            placeholder={Constants.SEARCHBOX_PLACEHOLDER} 
            className="searchbox_searchbar" 
            onChange={debounce((e: any) => setSearchTerm(state => e.target.value), 250)}
            onFocus={() => setIsSearchResultsDisplayed(true)}
            onBlur={() => setIsSearchResultsDisplayed(false)}
          />

          {/* Search results */}
          {(works && searchTerm?.trim() && isSearchResultsDisplayed) ? <div className="searchbox_searchResults searchbox_searchResultsMinimumWidth">
            <SearchResults 
              work={works} 
            />
          </div> : null}

        </div>
      </nav>

      <h1>{searchTerm}</h1>

     </div>
  );

}

export default HelloWorld;