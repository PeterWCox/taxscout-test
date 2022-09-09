
export interface Isbn {
    "@formatcode": string;
    $:             string;
  }
  
  
  export interface Titles {
    isbn: Isbn;
  }
  
  export enum ExpandLevel {
    Links = 0,
    LinksAndDetails = 1
  }
  
  export interface Isbn {
    "@contributortype": string;
    $:                  string;
  }
  
  export interface WorksClass {
    works: string[] | string;
  }