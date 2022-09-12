import { uniqueId } from "lodash";
import { Work } from "../models/Work";
import works from "../slices/works";
import { ShimmerThumbnail  } from "react-shimmer-effects";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorks, worksSelector } from '../slices/works';
import { SearchCard } from "./SearchCard";
import { Constants } from "../common/Constants";

export interface ISearchResultsProps {
    work: Work | Work[];
}

export const SearchResults = (props: ISearchResultsProps) => {

    const { works, loading, worksHasErrors } = useSelector(worksSelector);

    if (worksHasErrors) {
        return <p>An error has occured:</p>
    }

    //If still loading data from API
    if (loading) {
        return (
            [...Array(Constants.NUMBER_OF_SEARCH_RESULTS)].map((i) => {
                return (
                <ShimmerThumbnail 
                    key={uniqueId()}
                    height={60}
                />
            )})
        );
    }

    //If work is an array,
    if (Array.isArray(props.work)) {
        return (
                works?.map((work: Work) => {
                    return (
                    <SearchCard 
                        key={uniqueId()}
                        work={work} 
                    />
                    )
                })
        )
    }

    //Otherwise a single book is returned
    return (
        <SearchCard 
            key={uniqueId()}
            work={props.work} 
        />
    )

}