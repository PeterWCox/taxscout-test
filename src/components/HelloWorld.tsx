import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { fetchWorks, worksSelector } from '../slices/works';
import './HelloWorld.scss'
import { Author } from "../models/Author";
import { ExpandLevel } from "../models/Misc";
import { Work } from "../models/Work";
import { debounce } from "lodash";
import { SearchCard } from "./SearchCard";

const HelloWorld = () =>
{

  const searchTerm = useState<string>("");
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
          <div>
            <input className="searchbox_searchbar" placeholder="Quick search..." />
          </div>
          <div className="searchbox_searchResults">
              {works.map((work: Work) => {
                return <SearchCard work={work} />
              })}
          </div>
        </div>
      </nav>
     </div>
  );

}

export default HelloWorld;