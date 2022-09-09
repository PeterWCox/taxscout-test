import React from "react";
import axios from "axios";

import './HelloWorld.scss'

export interface Author {

  //e.g "https://reststop.randomhouse.com/resources/authors?start=0&max=100&expandLevel=1&firstName=John&lastName=Williams
  "@uri": string;

  //'X' = true, empty = false
  approved: string;

  //First and last name in proper case concatenated for display
  authordisplay: string;

  //Authors first name
  authorfirst: string;

  //Author First name cast to lower case
  authorfirstlc: string;

  //A unique authorid
  authorid: string;

  //Authors last name
  authorlast: string;

  //Author upper-case of author's name with the last name first
  authorlastfirst: string;

  //Author last name cast to lower case  
  authorlastlc: string;

  //Authors Titles (as ISBN numbers)
  titles: Titles | null; 
  
  //Author last initial lower case
  lastinitial: string;

  // HTML snippet about the author.
  spotlight?: string;

  //A collection of titles that share the same content identified by a Penguin 
  //Random House-specific Work ID. Different formats of a title are collected 
  // under the same Work ID.
  works: WorksClass | null;
}

export interface Work {

  //e.g. "https://reststop.randomhouse.com/resources/works/23847"
  "@uri":            string;

  //e.g. CARDANO, GIROLAMO"
  authorweb:         string;

  //e.g. "2002-10-31T00:00:00-05:00"
  onsaledate:        string;

  titles:            Titles;
  
  // e.g. The Book of My Life : Girolamo Cardano; Introduction by Anthony Grafton; Translated by Jean Stoner"
  titleAuth:         string;

  //e.g. "The Book of My Life :  : Girolamo Cardano; Introduction by Anthony Grafton; Translated by Jean Stoner"
  titleSubtitleAuth: string;

  //e.g. BOOK OF MY LIFE, THE
  titleshort:        string;

  //e.g. "The Book of My Life"
  titleweb:          string;

  //e.g. "23847"
  workid:            string;
}

export interface Isbn {
  "@formatcode": string;
  $:             string;
}


export interface Titles {
  isbn: Isbn;
}

export enum ExpandLevel {
  Links = 0,
  LinksAndDetails = 1
}

export interface Isbn {
  "@contributortype": string;
  $:                  string;
}

export interface WorksClass {
  works: string[] | string;
}


const HelloWorld: React.FC<{}> = () => {

  const [authors, setAuthors] = React.useState<Author[]>([])
  const [works, setWorks] = React.useState([])
  

  React.u

  React.useEffect(() => {

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
    getAuthors(0, 100, ExpandLevel.LinksAndDetails, "John", "Williams");

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
    getWorks(0, 100, ExpandLevel.LinksAndDetails, "Stoner");
      
  }, [])

  return (
    <div className="container">



      {/* Navbar */}
      <div className="navbar">
        <input
          type="text"
          placeholder="Quick search..."
        />
      </div>

      {/* Authors */}
      <div>
        <h3>Authors</h3>
        <ul>
          {authors?.map((author: Author, index) => {
            return <li key={index}>{author.authordisplay}</li>
          })}
        </ul>
      </div>

        {/* Works */}
        <div>
        <h3>Works</h3>
        <ul>
          {works?.map((work: Work, index) => {
            return <li key={index}>{work.titleAuth}</li>
          })}
        </ul>
      </div>

      

    </div>




  )
};

export default HelloWorld;
