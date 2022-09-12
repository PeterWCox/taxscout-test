import { Work } from "../models/Work"
import './SearchCard.scss'

export interface ISearchCardProps {
    work: Work
}

export const SearchCard = (props: ISearchCardProps) => {

    const author: string = props.work.AuthorName();

    return (
        <div className="searchbar_Result">
            <a href={props.work.AmazonUrl()}>
                <div className="searchbarResult_Image">
                    <img src={props.work.CoverUrl()} />
                </div>
                <div className="searchbarResult_Content">
                    <div className="searchbarResult_Title">
                       {props.work?.titleAuth}
                    </div>
                    <div className="searchbarResult_Author">
                        by {author}
                    </div>
                </div>
            </a>
        </div>
    );
}
