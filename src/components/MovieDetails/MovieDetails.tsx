import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MovieDetailsCard from "../MovieDetailsCard/MovieDetailsCard";
import { IMovie, IMovieDetails } from "../../types";
import SkeletonMovieCard from "../MovieCardSkeleton/SkeletonMovieCard";
import { MovieContext } from "../../context/MovieContext";
import { FavMovieContext } from "../../context/FavMovie";
import {getFavAnime} from '../../services/GetFavAnime';

const MovieDetails = () => {
  const { id } = useParams();
  const {movies,setMovies} = useContext(MovieContext);
  const { favmovies } = useContext(FavMovieContext);
  const [movie, setMovie] = useState<IMovie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
   const getAnimeData = async ()=>{
      const result = await getFavAnime(parseInt(id!));
      
      setMovie(result.data.Media)
      setLoading(false)
   }
   getAnimeData();
  }, [movies]);

  return (
    <>
      {loading ? (
        <SkeletonMovieCard />
      ) : (
        movie && (
          <MovieDetailsCard
            id={id as string}
            details={movie as IMovieDetails}
          />
        )
      )}
    </>
  );
};

export default MovieDetails;
