import axios from "axios";
import { Constants } from "../common/Constants";
import { ExpandLevel } from "../models/Misc";
import { Work, WorkResponse } from "../models/Work";

export interface IWorksRepository {
    getWorks: (search: string) => Promise<WorkResponse>;
}

export class WorksRepository_API implements IWorksRepository {
    
    public getWorks = async (search: string): Promise<WorkResponse> => {

        try {
            
        const workResponse = {
            work: [],
            errorMessage: null
        }

        const config = {
            method: 'get',
            url: "https://reststop.randomhouse.com/resources/works",
            params: {
              start: 0,
              max: Constants.NUMBER_OF_SEARCH_RESULTS,
              expandLevel: ExpandLevel.LinksAndDetails,
              search: search
            },
            headers: { 
              'Accept': 'application/json'
            }
        };

        const response = await axios(config);

        //If 'Work' property is an array...
        if (Array.isArray(response.data.work)) {

            const worksToReturn: Work[] = response.data.work.map((w: any) => {
                let newWork = new Work();
                newWork["@uri"] = w["@uri"] ?? ""
                newWork.authorweb = w.authorweb ?? "";
                newWork.onsaledate = w.onsaledate ?? "";
                newWork.titles = w.titles ?? "";
                newWork.titleAuth = w.titleAuth ?? "";
                newWork.titleSubtitleAuth = w.titleSubtitleAuth ?? "";
                newWork.titleshort = w.titleshort ?? "";
                newWork.titleweb = w.titleweb  ?? "";
                newWork.workid = w.workid ?? "";
                return newWork;
            });

            return {...workResponse, work: worksToReturn};

        } else {

            const workToReturn  = new Work()
            workToReturn["@uri"] = response.data.work["@uri"] ?? "";
            workToReturn.authorweb = response.data.work.authorweb ?? "";
            workToReturn.onsaledate = response.data.work.onsaledate ?? "";
            workToReturn.titles = response.data.work.titles ?? "";
            workToReturn.titleAuth = response.data.work.titleAuth ?? "";
            workToReturn.titleSubtitleAuth = response.data.work.titleSubtitleAuth ?? "";
            workToReturn.titleshort = response.data.work.titleshort ?? "";
            workToReturn.titleweb = response.data.work.titleweb ?? "";
            workToReturn.workid = response.data.work.workid ?? "";

            return {...workResponse, work: workToReturn};
        }

        } catch (error) {
            console.log(error);
            return {work: [], errorMessage: error.message};
        }


    }


    


}