import { Work } from "../models/Work"
import './SearchCard.scss'

export interface ISearchCardProps {
    work: Work
}

export const SearchCard = (props: ISearchCardProps) => {

    //NOTE: props.work.titles.isbn can be an array of objects or single object
    //      so we need to check for that and handle it accordingly

    let imageUrl = "";
    let amazonUrl = "";

    let isbn: unknown = props.work?.titles?.isbn;

    if (!props.work?.titles) {
    }
    else if (Array.isArray(isbn)) {
    imageUrl = `https://images.randomhouse.com/cover/${props.work.titles?.isbn[0]["$"]}`;
    amazonUrl = `https://www.amazon.co.uk/s?i=stripbooks&rh=p_66%3A${props.work.titles?.isbn[0]["$"]}`;
    }
    else {
    imageUrl = `https://images.randomhouse.com/cover/${isbn["$"]}`;
    amazonUrl = `https://www.amazon.co.uk/s?i=stripbooks&rh=p_66%3A${props.work.titles?.isbn["$"]}`;
    }

    const authorName = (props.work.titleAuth && props.work.titleAuth.trim() !== "") ? 
    (props.work?.titleAuth?.split(":")[1]?.trim() ?? props.work.authorweb) :
    props?.work?.authorweb;



    return (
        <div className="searchbar_Result">
            <a href={amazonUrl}>
                <div className="searchbarResult_Image">
                    <img src={imageUrl} />
                </div>
                <div className="searchbarResult_Content">
                    <div className="searchbarResult_Title">
                       {props.work?.titleAuth}
                    </div>
                    <div className="searchbarResult_Author">
                        by {authorName}
                    </div>
                </div>
            </a>
        </div>
    );
}
