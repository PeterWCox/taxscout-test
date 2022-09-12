import { Work } from "../models/Work"
import './SearchCard.scss'

export interface ISearchCardProps {
    work: Work
}

export const SearchCard = (props: ISearchCardProps) => {

      let imageUrl = "";
      let isbn: any = props.work.titles.isbn;

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
        <div className="searchbar_Result">
            {/* Book Photo */}
            <div className="searchbarResult_Image">
                <img src="https://images.randomhouse.com/cover/9780593099322" />
            </div>

            {/* Content */}
            <div className="searchbarResult_Content">
                <div className="searchbarResult_Title">
                    {props.work.titleAuth}
                </div>
                <div className="searchbarResult_Author">
                    by {authorName}
                </div>
            </div>
  </div>
    );
}
