import React, { useState, useEffect, useContext } from "react";
import { FavMovieContext } from "../../context/FavMovie";
import { css } from "@emotion/css";
import MovieCard from "../MovieCard/MovieCard";
import { MovieContext } from "../../context/MovieContext";
import { getFavAnime } from "../../services/GetFavAnime";
import SkeletonMovieCard from "../MovieCardSkeleton/SkeletonMovieCard";
import { IMovieDetails } from "../../types";

const moviecontainer = css`
  display: grid;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 200px;
  place-items: center;
  grid-template-columns: 1fr 1fr; /* Two columns for desktop and tablet view */

  @media (max-width: 768px) {
    /* One column for mobile view */
    grid-template-columns: 1fr;
  }
`;
const headingStyle = css`
  margin: 0px;
  flex: 1;
  color: #c5c5c5;
`;
const MyMovies = () => {
  // const color = "darkgreen";
  const { favmovies } = useContext(FavMovieContext);
  const [favmoviesData, setFavMoviesData] = useState<IMovieDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const favcount = JSON.parse(window.localStorage.getItem("favMovies") as string).length || 0;
  const [store, setStore] = useState(window.localStorage.getItem("favMovies"));
  window.addEventListener("storage", () =>
    setStore(localStorage.getItem("favMovies"))
  );

  useEffect(() => {
    setLoading(true)
    setFavMoviesData([]);
    const func = async function () {
        let result = [];
        for (let i = 0; i < favmovies.length; i++) {
          const data = await getFavAnime(parseInt(favmovies[i].id));
          result.push(data.data.Media);
        }
        setFavMoviesData(result);
        setLoading(false);
    };
    func();
  }, [favmovies]);

  return (
    <div className="movielist__container">
      <div
        className={css({
          width: "100%",
          fontSize: "2rem",
          textAlign: "center",
          position: "fixed",
          zIndex: 10,
          backgroundColor: "gray",
          padding: "20px 0px",
          marginBottom: "200px",
          top: "0px",
          left: "0px",
        })}
      >
        <h3 className={headingStyle}>FAVOURITE MOVIES</h3>
      </div>
      {loading && favmovies.length != 0 ? (
        <div className={moviecontainer}>
          {" "}
          {[...Array(4)].map(() => (
            <SkeletonMovieCard />
          ))}{" "}
        </div>
      ) : (
        <>
          {favmoviesData && favmoviesData.length != 0 ? (
            <div className={moviecontainer}>
              {favmoviesData.map((movie: IMovieDetails) => {
                return (
                  <MovieCard
                    key={movie.id}
                    id={movie.id}
                    coverImage={movie.coverImage}
                    title={movie.title}
                    genres={movie.genres}
                    type={movie.type}
                  />
                );
              })}
            </div>
          ) : (
            <div
              className={css({
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "bold",
                width: "100%",
                height: "200px",
              })}
            >
              NO FAVOURITES
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default MyMovies;
