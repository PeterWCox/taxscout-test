import { Titles } from "./Misc";

export interface Work {

    //e.g. "https://reststop.randomhouse.com/resources/works/23847"
    "@uri":            string;
  
    //e.g. CARDANO, GIROLAMO"
    authorweb:         string;
  
    //e.g. "2002-10-31T00:00:00-05:00"
    onsaledate:        string;
  
    titles:            Titles;
    
    // e.g. The Book of My Life : Girolamo Cardano; Introduction by Anthony Grafton; Translated by Jean Stoner"
    titleAuth:         string;
  
    //e.g. "The Book of My Life :  : Girolamo Cardano; Introduction by Anthony Grafton; Translated by Jean Stoner"
    titleSubtitleAuth: string;
  
    //e.g. BOOK OF MY LIFE, THE
    titleshort:        string;
  
    //e.g. "The Book of My Life"
    titleweb:          string;
  
    //e.g. "23847"
    workid:            string;
  }