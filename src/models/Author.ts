import { Isbn, Titles, WorksClass } from "./Misc";

export class Work {

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

  public AmazonUrl = (): string => {

      const isbn: Isbn | Isbn[] = this.titles?.isbn;
      
      if (!isbn) {
          return "";
      }

      return (Array.isArray(isbn)) ?
          `https://www.amazon.co.uk/s?i=stripbooks&rh=p_66%3A${isbn[0]["$"]}` :
          `https://www.amazon.co.uk/s?i=stripbooks&rh=p_66%3A${isbn["$"]}`;
  }

  public CoverUrl = (): string => {
      const isbn: Isbn | Isbn[] = this.titles?.isbn;
      
      if (!isbn) {
          return "";
      }

      if (Array.isArray(isbn)) {
          return `https://images.randomhouse.com/cover/${this.titles?.isbn[0]["$"]}`;
      } else {
          return `https://images.randomhouse.com/cover/${isbn["$"]}`;
      }
  }

  public AuthorName = (): string => {

      //Try to get "James Bond" from concatenated "James Bond : Ian Fleming",
      //default to "FLEMING, JAMES" if doesn't work

      return this.titleAuth?.split(":")[1]?.trim() ?? this.titleAuth;
  }


}
