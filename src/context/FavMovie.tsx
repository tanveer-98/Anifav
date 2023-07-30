import React, { createContext, useEffect, useState } from "react";
interface IMovie {
  id: string;
}
interface IMovieContext {
  favmovies: IMovie[];
  setFavMovies: React.Dispatch<React.SetStateAction<IMovie[]>>;
}
const FavMovieContext = createContext<IMovieContext>({} as IMovieContext);

const FavMovieProvider  = ({ children }: any) => {
  const [favmovies, setFavMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    const storedFavMovies = localStorage.getItem("favMovies");
    if (storedFavMovies) {
      setFavMovies(JSON.parse(storedFavMovies));
    }
  }, []);

  // Save data to local storage when favmovies state changes
  useEffect(() => {
    localStorage.setItem("favMovies", JSON.stringify(favmovies));
  }, [favmovies]);

  return (
    <FavMovieContext.Provider value={{ favmovies, setFavMovies }}>
      {children}
    </FavMovieContext.Provider>
  );
};

export { FavMovieProvider, FavMovieContext };
