import React, { useContext, useEffect, useRef, useState } from "react";
import { css } from "@emotion/css";
import { IMovie } from "../../types";
import { FavMovieContext } from "../../context/FavMovie";
import { useNavigate } from "react-router-dom";
import Skeleton from "../MovieCardSkeleton/Skeleton";
import LazyLoadImage from "../LazyLoader/LazyLoader";
import SkeletonMovieCard from "../MovieCardSkeleton/SkeletonMovieCard";
const cardStyle = css`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  width: 300px;
  margin: 10px;
  cursor: pointer;
  position: relative;
  display: flex;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
  z-index: 1;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const titleStyle = css`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
`;
const genreContainer = css`
  display : flex; 
  gap: 2px;
  align-items: center;
  flex-direction : row;
  flex-wrap : wrap;
`

const genreStyle = css`
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
  border-radius : 5px;
  padding : 2px 4px;
  border: 1px solid black;
  width: fit-content;
`;

const yearStyle = css`
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
`;

const typeStyle = css`
  font-size: 14px;
  font-style: italic;
  color: #888;
`;

const cardLeft = css`
  flex: 1;
`;
const cardRight = css`
  width: 40px;
  // height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #a0a0a0;
  border-radius: 50px;
  cursor: pointer;

  &:hover {
    background-color: #606060;
  }
`;

const favoriteButtonStyle = css`
  background-color: #007bff;
  //   height :100%;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 6;
  &:hover {
    background-color: #88c0ff;
  }
`;
const imageContainer = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
  object-fit: contain;
  background-postition: center;
`;

const image = css`
  height : 300px;
  width: 200px;
  object-fit: contain;
  //   background-postition: center;

  @media (min-width: 500px) {
    /* Styles applied when the viewport width is 600px or less */
    width: 300px;
  }

  @media (min-width: 601px) {
    margin-right: 0px;
  }
`;

interface ILoadedImg {
  id: string;
}
const MovieCard = ({ id, title, genres, type , coverImage}: IMovie) => {
  const { favmovies, setFavMovies } = useContext(FavMovieContext);
  const [visibleMovies, setVisibleMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const listRef = useRef(null);
  const isFavorite = favmovies.some((favMovie) => favMovie.id === id);
  const navigate = useNavigate();

  const handleNavigate = (id: string) => {
    navigate(`/details/${id}`);
  };
  
  const handleToggleFavorite = (event: any) => {
    event.stopPropagation();
    if (isFavorite) {
      // Remove movie from favorites
      const updatedFavMovies = favmovies.filter(
        (favMovie) => favMovie.id != id
      );
      setFavMovies(updatedFavMovies);
    } else {
      // Add movie to favorites
      setFavMovies([...favmovies, { id }]);
    }
  };
 
  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    },300)
   

  },[]);
  return (
    <>
      {loading ? (
        <SkeletonMovieCard />
      ) : (
        <div className={cardStyle} onClick={() => handleNavigate(id)}>
          <div className={cardLeft}>
            <div className={imageContainer}>
              {loading ? (
            <Skeleton width="100%" height="400px" borderRadius="10px" />
          ) : (
              <img
                src={coverImage.large}
                alt=" NO image "
                loading="lazy"
                width="300px"
                height="400px"
              />
              )} 
            </div>
            {/* <div className={titleStyle}>{id}</div> */}
            <div className={titleStyle}>{title!.english}</div>
            <div className={genreContainer}>
            {
              genres?.map((element)=>{
                return <div className={genreStyle}>{element}</div>
              })
            }

            </div>
            {/* <div className={genreStyle}>{genres![0]} </div> */}
            {/* <div className={yearStyle}>Year: {Year}</div> */}
            <div className={typeStyle}>Type: {type}</div>
          </div>
          <button
            className={favoriteButtonStyle}
            onClick={(event) => handleToggleFavorite(event)}
          >
            {isFavorite ? "Remove Fav" : "Add Fav"}
          </button>
        </div>
      )}
    </>
  );
};

export default MovieCard;
