import { uniqueId } from "lodash";
import { Work } from "../models/Work";
import works from "../slices/works";
import { ShimmerThumbnail  } from "react-shimmer-effects";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorks, worksSelector } from '../slices/works';
import { Constants } from "../common/Constants";
import { SearchCard } from "./SearchCard/SearchCard";

export interface ISearchResultsProps {
    work: Work[] | Work;
}

export const SearchResults = (props: ISearchResultsProps) => {

    const { works, loading, worksHasErrors } = useSelector(worksSelector);

    if (!loading && works.length === 0) {
        return null;
    }

    // If still loading data from API, return X Shimmers
    if (loading) {
        return (
            <div className="searchbox_searchResults searchbox_searchResultsMinimumWidth">
            {[...Array(Constants.NUMBER_OF_SEARCH_RESULTS)].map((i) => {
                return (
                <ShimmerThumbnail 
                    key={uniqueId()}
                    height={60}
                />
            )})}
            </div>
        );
    }

    //If work is an array,
    if (Array.isArray(props.work)) {
        return (
            <div className="searchbox_searchResults searchbox_searchResultsMinimumWidth">
                {works?.map((work: Work) => {
                    return (
                    <SearchCard 
                        key={uniqueId()}
                        work={work} 
                    />
                    )
                })}
            </div>
        )
    }

    console.log("NOT A BOOK!", props.work);

    //Otherwise a single book is returned
    return (
        <div className="searchbox_searchResults searchbox_searchResultsMinimumWidth">
            <SearchCard 
                key={uniqueId()}
                work={props.work} 
            />
        </div>
    )

}