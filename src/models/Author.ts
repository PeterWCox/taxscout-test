import { Titles, WorksClass } from "./Misc";

export interface Author {

    //e.g "https://reststop.randomhouse.com/resources/authors?start=0&max=100&expandLevel=1&firstName=John&lastName=Williams
    "@uri": string;
  
    //'X' = true, empty = false
    approved: string;
  
    //First and last name in proper case concatenated for display
    authordisplay: string;
  
    //First name
    authorfirst: string;
  
    //First name cast to lower case
    authorfirstlc: string;
  
    //Unique ID
    authorid: string;
  
    //ast name
    authorlast: string;
  
    //Author upper-case of author's name with the last name first
    authorlastfirst: string;
  
    //Author last name cast to lower case  
    authorlastlc: string;
  
    //Authors Titles (as ISBN numbers)
    titles: Titles | null; 
    
    //Author last initial lower case
    lastinitial: string;
  
    // HTML snippet about the author.
    spotlight?: string;
  
    //A collection of titles that share the same content identified by a Penguin 
    //Random House-specific Work ID. Different formats of a title are collected 
    // under the same Work ID.
    works: WorksClass | null;
  }