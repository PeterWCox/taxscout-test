import { Work } from "../models/Work"
import './SearchCard.scss'

export interface ISearchCardProps {
    work: Work
}

export const SearchCard = (props: ISearchCardProps) => {

    //NOTE: props.work.titles.isbn can EITHEr be an array of objects or single object
    //      so we need to check for that and handle it accordingly

    let imageUrl = "";
    let amazonUrl = "";

      let isbn: any = props.work.titles.isbn;

      if (!props.work?.titles) {
      }
      else if (Array.isArray(isbn)) {
        // @ts-ignore
        imageUrl = `https://images.randomhouse.com/cover/${props.work.titles?.isbn[0]["$"]}`;
        // @ts-ignore
        amazonUrl = `https://www.amazon.co.uk/s?i=stripbooks&rh=p_66%3A${props.work.titles?.isbn[0]["$"]}&Adv-Srch-Books-Submit.x=30&Adv-Srch-Books-Submit.y=9&__mk_en_GB=%C3%85M%C3%85Z%C3%95%C3%91&unfiltered=1&ref=sr_adv_b`;
      }
      else {
        // @ts-ignore
        imageUrl = `https://images.randomhouse.com/cover/${isbn["$"]}`;
        // @ts-ignore
        amazonUrl = `https://www.amazon.co.uk/s?i=stripbooks&rh=p_66%3A${props.work.titles?.isbn["$"]}&Adv-Srch-Books-Submit.x=30&Adv-Srch-Books-Submit.y=9&__mk_en_GB=%C3%85M%C3%85Z%C3%95%C3%91&unfiltered=1&ref=sr_adv_b`;
      }

      const authorName = (props.work.titleAuth && props.work.titleAuth.trim() !== "") ? 
        (props.work.titleAuth.split(":")[1]?.trim() ?? props.work.authorweb) :
        props.work.authorweb;



    return (
        <div className="searchbar_Result">
            <a href={amazonUrl}>
                <div className="searchbarResult_Image">
                    <img src={imageUrl} />
                </div>
                <div className="searchbarResult_Content">
                    <div className="searchbarResult_Title">
                       {props.work.titleAuth}
                    </div>
                    <div className="searchbarResult_Author">
                        by {authorName}
                    </div>
                </div>
            </a>
        </div>
    );
}
