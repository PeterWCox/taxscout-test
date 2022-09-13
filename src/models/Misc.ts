export interface Isbn {
    "@formatcode": string;
    $: string;
  }
  
  export interface Titles {
    
    //This can be either an array of objects OR a single object - must be resolved at runtime
    isbn: Isbn | Isbn[];  
  }
  
  export enum ExpandLevel {
    Links = 0,
    LinksAndDetails = 1
  }
  
  export interface Isbn {
    "@contributortype": string;
    $: string;
  }
  
  export interface WorksClass {
    works: string[] | string;
  }