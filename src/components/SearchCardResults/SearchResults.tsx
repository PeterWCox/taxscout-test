import { uniqueId } from "lodash";
import { Work } from "../../models/Work";
import works from "../../slices/works";
import { ShimmerThumbnail  } from "react-shimmer-effects";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorks, worksSelector } from '../../slices/works';
import { Constants } from "../../common/Constants";
import { SearchCard } from "../SearchCard/SearchCard";

export interface ISearchCardResults {
    work: Work[] | Work;
    searchTerm: string;
}

export const SearchCardResults = (props: ISearchCardResults) => {

    const { works, loading, worksHasErrors } = useSelector(worksSelector);

    console.log(works);

    //Render nothing if searchbar empty 
    if (props.searchTerm.trim() === "") return null;

    //Show loading shimmer X times if loading
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

    //If no results returned but everything ok
    if (works.length === 0) {
        return (
            <div className="searchbox_searchResults">
                <img src="https://i.giphy.com/media/LkjlH3rVETgsg/200.gif"></img>
                <a className="searchbox_searchResults--SeeAll">No results for '{props.searchTerm}' - sorry about that...</a>
            </div>
        )
    }

    //If results is an array,
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
                <a href={`https://www.amazon.co.uk/s?k=${props.searchTerm.replace(" ", "+")}&crid=O8LK9VXIGUBY&sprefix=harry+pott%2Caps%2C319&ref=nb_sb_noss_2`}className="searchbox_searchResults--SeeAll">
                    See all results for '{props.searchTerm}' 
                </a>
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