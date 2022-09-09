import React from "react";
import axios from "axios";

import './HelloWorld.scss'
import { Author } from "../models/Author";
import { ExpandLevel } from "../models/Misc";
import { Work } from "../models/Work";
import { debounce } from "lodash";







const HelloWorld: React.FC<{}> = () => {

  const [authors, setAuthors] = React.useState<Author[]>([])
  const [works, setWorks] = React.useState([])
  const [searchTerm, setSearchTerm] = React.useState('')

  React.useEffect(() => {
    
    //Works
    const getWorks = async (start: number, end: number, expandLevel: ExpandLevel, search: string): Promise<void> => {
      var config = {
        method: 'get',
        url: `https://reststop.randomhouse.com/resources/works?
          start=${start}&
          max=${end}&
          expandLevel=${expandLevel}&
          search=${search}`.replace(/\s/g, ""),
        headers: { 
          'Accept': 'application/json'
        }
      };
      
      axios(config)
      .then(function (response) {
        console.log(response);
        setWorks(response.data.work);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    getWorks(0, 100, ExpandLevel.LinksAndDetails, searchTerm);
  }, [searchTerm]);

  
  return (
    <div className="container">

      <h1>Search for Titles</h1>

      <input 
        type="text" 
        placeholder="Search" 
        onChange={debounce((e: any) => setSearchTerm(e.target.value), 500)}
      />

     
      {/* Authors */}
      <div>
        <ul>
          {works?.map((works: Work, index) => {
            return <li key={index}>{works.titleAuth}</li>
          })}
        </ul>
      </div>

    </div>




  )
};

export default HelloWorld;
