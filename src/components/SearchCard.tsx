import { Work } from "../models/Work"
import './SearchCard.scss'

export interface ISearchCardProps {
    work: Work
}

export const SearchCard = (props: ISearchCardProps) => {

      let imageUrl = "";
      let isbn = props.work.titles.isbn;

      if (!props.work?.titles) {
      }
      else if (Array.isArray(isbn)) {
        imageUrl = `https://images.randomhouse.com/cover/${props.work.titles?.isbn[0].$}`;
      }
      else {
        console.log(isbn["$"])
        console.log(`https://images.randomhouse.com/cover/${isbn["$"]}`)
        imageUrl = `https://images.randomhouse.com/cover/${isbn["$"]}`;
      }

      const authorName = (props.work.titleAuth && props.work.titleAuth.trim() !== "") ? 
        (props.work.titleAuth.split(":")[1]?.trim() ?? props.work.authorweb) :
        props.work.authorweb;

    return (
        <div className="searchCard">
                  
            {/* Book Photo */}
            <div className="searchCard-Image">
                <img src={imageUrl} />
            </div>
    
            {/* Content */}
            <div className="searchCard-Content">
                <div className="searchCard-Content__Title">
                    {/* {props.work.titleAuth} */}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium consequuntur autem minus velit ratione repudiandae.

                </div>
                <div className="searchCard_Content__Author">
                    {`by ${authorName}`}
                </div>
            </div>
            
        </div>
    );
}

//border: 1px solid rgb(216, 216, 216)