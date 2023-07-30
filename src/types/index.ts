export interface IMovie {
  id: string;
  title?: { english: string };
  Year?: string;
  genres?: [string];
  type?: string;
  coverImage: {
    extraLarge?: string;
    large?: string;
    medium?: string;
    color?: string;
  };
}

export interface IMovieDetails {
  id: string;
  title: { english: string };
  Year: string;
  genres: [string];
  type: string;
  coverImage: {
    extraLarge?: string;
    large?: string;
    medium?: string;
    color?: string;
  };
  description : string;
  duration : string ;
  popularity : string; 
  countryOfOrigin : string ; 
}
