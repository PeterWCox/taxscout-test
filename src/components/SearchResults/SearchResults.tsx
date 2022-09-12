import { uniqueId } from "lodash";
import { Work } from "../../models/Work";
import works from "../../slices/works";
import { ShimmerThumbnail  } from "react-shimmer-effects";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorks, worksSelector } from '../../slices/works';
import { Constants } from "../../common/Constants";
import { SearchCard } from "../SearchCard/SearchCard";

export interface ISearchResultsProps {
    work: Work[] | Work;
    searchTerm: string;
}

export const SearchResults = (props: ISearchResultsProps) => {

    const { works, loading, worksHasErrors } = useSelector(worksSelector);

    // If still loading data from API, return X Shimmers
    if (loading) {
        return (
            <div className="searchbox_searchResults">
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

    //If no results
    if (works.length === 0 && !loading && !worksHasErrors && (props.searchTerm !== "")) {
        return (
            <div className="searchbox_searchResults">
                <img src="https://i.giphy.com/media/LkjlH3rVETgsg/200.gif"></img>
                <a className="searchbox_searchResults--SeeAll">No results - sorry about that...</a>
            </div>
        )
    }

    //If work is an array,
    if (Array.isArray(props.work)) {
        return (
        <>
            <div className="searchbox_searchResults">
                {works?.map((work: Work) => {
                    return (
                    <SearchCard 
                        key={uniqueId()}
                        work={work} 
                    />
                    )
                })}
                <a className="searchbox_searchResults--SeeAll">See all results for {props.searchTerm} </a>
            </div>
        </>
        )
    }



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