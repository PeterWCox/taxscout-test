import { Isbn, Titles } from "./Misc";

export class WorkResponse {
    work: Work | Work[];
    errorMessage: string;
}

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

        //Response is either an array of ISBNs or a single ISBN, must resolve at runtime
        const isbn: Isbn | Isbn[] = this.titles?.isbn;
        
        if (!isbn) {
            return "";
        }

        if (Array.isArray(isbn)) {
            return `https://www.amazon.co.uk/s?i=stripbooks&rh=p_66%3A${isbn[0]["$"]}`;
        } else {
            return `https://www.amazon.co.uk/s?i=stripbooks&rh=p_66%3A${isbn["$"]}`;
        }
        
    }

    public CoverUrl = (): string => {

        //Response is either an array of ISBNs or a single ISBN, must resolve at runtime
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

        console.log(this.titleAuth);

        //Try and get beautified name using titleAuth i.e. TITLE : Author, if 
        //not resort to FLEMING, IAN as a a last resort
        return (this.titleAuth && this.titleAuth !== "") ? 
            (this.titleAuth?.split(":")[1]?.trim() ?? this.authorweb) :
            this.authorweb;
    }

    


}
