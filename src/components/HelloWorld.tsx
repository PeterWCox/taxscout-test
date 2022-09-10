import React from "react";
import axios from "axios";

import './HelloWorld.scss'
import { Author } from "../models/Author";
import { ExpandLevel } from "../models/Misc";
import { Work } from "../models/Work";
import { debounce } from "lodash";


// User Types "James Stoner"




const HelloWorld: React.FC<{}> = () => {

  const [authors, setAuthors] = React.useState<Author[]>([])
  const [works, setWorks] = React.useState([])
  const [searchTerm, setSearchTerm] = React.useState('')

  React.useEffect(() => {
    
    //Works
    
    //Authors
    const getAuthors = async (start: number, end: number, expandLevel: ExpandLevel, firstName: string, lastName: string): Promise<void> => {
      var config = {
        method: 'get',
        url: `https://reststop.randomhouse.com/resources/authors?
          start=${start}&
          max=${end}&
          expandLevel=${expandLevel}&
          firstName=${firstName}&
          lastName=${lastName}`.replace(/\s/g, ""),
        headers: { 
          'Accept': 'application/json'
        }
      };
      
      axios(config)
      .then(function (response) {
        console.log(response);
        setAuthors(response.data.author);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    getAuthors(0, 5, ExpandLevel.LinksAndDetails, "John", "Williams");

    //Works
    const getWorks = async (start: number, end: number, expandLevel: ExpandLevel, search: string): Promise<void> => {
      var config = {
        method: 'get',
        url: `https://reststop.randomhouse.com/resources/works?
          start=${start}&
          max=${end}&
          expandLevel=${expandLevel}&
          search=${searchTerm}`.replace(/\s/g, ""),
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
    if (searchTerm !== "") {
      getWorks(0, 5, ExpandLevel.LinksAndDetails, searchTerm);
    } 


  }, [searchTerm]);

  
  return (
    <div className="container">

      <h1>Search for Titles</h1>

      <input 
        type="text" 
        placeholder="Search" 
        onChange={debounce((e: any) => setSearchTerm(state => e.target.value), 500)}
      />

       {/* Titles */}
       <div>
        <h5>Authors</h5>
          {authors?.map((author: Author, index) => {
            return <div key={index}>{author.spotlight ?? ""}</div>
          })}
      </div>

     
      {/* Works */}
      <div>
        <h5>Works</h5>
        <ul>
          {works?.map((works: Work, index) => {
            return <li key={index}>{works.titleAuth ?? ""}</li>
          })}
        </ul>
      </div>

    </div>




  )
};

export default HelloWorld;
