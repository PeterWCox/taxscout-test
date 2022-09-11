import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { fetchWorks, worksSelector } from '../slices/works';
import './HelloWorld.scss'
import { Author } from "../models/Author";
import { ExpandLevel } from "../models/Misc";
import { Work } from "../models/Work";
import { debounce } from "lodash";

const HelloWorld = () =>
{

  const dispatch: any = useDispatch();
  const { works, loadingWorks, worksHasErrors } = 
    useSelector(worksSelector);

  useEffect(() =>
  {
    dispatch(fetchWorks())
  }, [dispatch])

  const renderWorks = () =>
  {
    if (loadingWorks) return <p>Loading works...</p>
    if (worksHasErrors) return <p>Cannot display works...</p>

    return works.map((work: any) => {

      // console.log(work.titles.isbn);

      //Check if work.titles.isbn is an array of objects or one object
      let imageUrl = "";
      
      let isbn = work.titles.isbn;
      if (!work?.titles) {
        // console.log(isbn)
      }
      else if (Array.isArray(isbn)) {
        // console.log(isbn)
        imageUrl = `https://images.randomhouse.com/cover/${work.titles?.isbn[0].$}`;
      }
      else {
        console.log(isbn["$"])
        console.log(`https://images.randomhouse.com/cover/${isbn["$"]}`)
        imageUrl = `https://images.randomhouse.com/cover/${isbn["$"]}`;
      }

      

      return (
        <div>
        <p>{work.titleAuth}</p>
        <img src={imageUrl}>
        </img>
        </div>
        )
      });
  }


  return (
    <div className="container">

      <nav>

        <div className="searchbox">

          <input className="searchbox_searchbar" />

          <div className="searchbox_searchResults">

            <div className="searchbar_Result">
                  
                  {/* Book Photo */}
                  <div className="searchbarResult_Image">
                    <img src="https://images.randomhouse.com/cover/9780593099322" />
                  </div>

                  {/* Content */}
                  <div className="searchbarResult_Content">
                    <div className="searchbarResult_Title">
                      Harry Potter and the Sourcere's Stone (Harry Potter, #1)
                    </div>
                    <div className="searchbarResult_Author">
                      by J.K. Rowling
                    </div>
                  </div>
            </div>
            <div className="searchbar_Result">
                  
                  {/* Book Photo */}
                  <div className="searchbarResult_Image">
                    <img src="https://images.randomhouse.com/cover/9780593099322" />
                  </div>

                  {/* Content */}
                  <div className="searchbarResult_Content">
                    <div className="searchbarResult_Title">
                      Harry Potter and the Sourcere's Stone (Harry Potter, #1)
                    </div>
                    <div className="searchbarResult_Author">
                      by J.K. Rowling
                    </div>
                  </div>
            </div>
            <div className="searchbar_Result">
                  
                  {/* Book Photo */}
                  <div className="searchbarResult_Image">
                    <img src="https://images.randomhouse.com/cover/9780593099322" />
                  </div>

                  {/* Content */}
                  <div className="searchbarResult_Content">
                    <div className="searchbarResult_Title">
                      Harry Potter and the Sourcere's Stone (Harry Potter, #1)
                    </div>
                    <div className="searchbarResult_Author">
                      by J.K. Rowling
                    </div>
                  </div>
            </div>

          </div>

        </div>

      </nav>

      {/* <h1>Hello</h1>
      <h1>Hello</h1>
      <h1>Hello</h1>
      <h1>Hello</h1>
      <h1>Hello</h1>
      <h1>Hello</h1>
      <h1>Hello</h1>
      <h1>Hello</h1>
      <h1>Hello</h1>
      <h1>Hello</h1>
      <h1>Hello</h1>
      <h1>Hello</h1>
      <h1>Hello</h1>
      <h1>Hello</h1>
      <h1>Hello</h1>
      <h1>Hello</h1>
      <h1>Hello</h1>
      <h1>Hello</h1>
      <h1>Hello</h1>
      <h1>Hello</h1>
      <h1>Hello</h1> */}

       
     </div>
  );

}

export default HelloWorld;