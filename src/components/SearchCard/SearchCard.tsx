import { Work } from '../../models/Work';
import './SearchCard.scss'

export interface ISearchCardProps {
    work: Work
}

export const SearchCard = (props: ISearchCardProps) => {

    return (
        <div className="searchbar_Result">
            <a href={props.work.AmazonUrl()}>
                <div className="searchbarResult_Image">
                    <img src={props.work.CoverUrl()} />
                </div>
                <div className="searchbarResult_Content">
                    <div className="searchbarResult_Title">
                       {props.work.titleweb}
                    </div>
                    <div className="searchbarResult_Author">
                        by {props.work.AuthorName()}
                    </div>
                </div>
            </a>
        </div>
    );
}
