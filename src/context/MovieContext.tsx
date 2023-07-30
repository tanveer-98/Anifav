import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import MoviesData from "./MovieList.json";
import { css } from "@emotion/css";
import Loading from "../components/Loading/Loading";
import { IMovieDetails } from "../types";
interface IMovieContext {
  movies: IMovieDetails[];
  setMovies: React.Dispatch<React.SetStateAction<any[]>>;
}
const MovieContext = createContext({} as IMovieContext);
interface IIMDBdata {
  title?: string;
  rank?: string;
  id?: string;
}
const LoadingStyle = css`
  // background-color:black;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MovieProvider = ({ children }: any) => {
  const [movies, setMovies] = useState<IMovieDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {}, []);
  if (loading) {
    return (
      <div className={LoadingStyle}>
        <Loading />
      </div>
    );
  }

  return (
    <MovieContext.Provider value={{ movies, setMovies }}>
      {children}
    </MovieContext.Provider>
  );
};

export { MovieProvider, MovieContext };
