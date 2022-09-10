//NOTES:

//1. The API only works for 1 word!

export interface Work {

    //e.g. "https://reststop.randomhouse.com/resources/works/23847"
    "@uri": string;
  
    //e.g. CARDANO, GIROLAMO"
    authorweb: string;
  
    //e.g. "2002-10-31T00:00:00-05:00"
    onsaledate: string;
  
    //Titles (includes ISBN only)
    titles: Titles;
    
    // e.g. The Book of My Life : Girolamo Cardano; Introduction by Anthony Grafton; Translated by Jean Stoner"
    titleAuth: string;
  
    //e.g. "The Book of My Life :  : Girolamo Cardano; Introduction by Anthony Grafton; Translated by Jean Stoner"
    titleSubtitleAuth: string;
  
    //e.g. BOOK OF MY LIFE, THE
    titleshort: string;
  
    //e.g. "The Book of My Life"
    titleweb: string;
  
    //e.g. "23847"
    workid: string;
}

export interface Titles {
  isbn: Isbn[];
}
export interface Isbn {


  "@formatcode": string;

  //ISBN Number e.g. 9780307831385
  $:             string;
}