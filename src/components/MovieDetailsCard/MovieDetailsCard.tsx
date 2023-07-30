import React, { useContext, useEffect, useRef, useState } from "react";
import { css } from "@emotion/css";
import { IMovie, IMovieDetails } from "../../types";
import { FavMovieContext } from "../../context/FavMovie";
import { useNavigate } from "react-router-dom";
import LazyLoadImage from "../LazyLoader/LazyLoader";
import Skeleton from "../MovieCardSkeleton/Skeleton";
const cardStyle = css`
  border: 1px solid #ccc;
  //   border-radius: 8px;
  padding: 16px;

  margin: 10px 50px;
  flex-direction: column;
  //  cursor:pointer;
  position: relative;
  display: flex;
  //   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
  z-index: 1;
`;

const titleStyle = css`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
  text-transform: uppercase;

  @media (min-width: 300px) {
    /* Styles applied when the viewport width is 600px or less */
    margin-right: 40%;
  }

  @media (min-width: 601px) {
    margin-right: 0px;
  }
`;

const genreStyle = css`
  margin-top: 10px;
  font-size: 14px;
  width: fit-content;
  //   display:flex;
  padding: 2px 5px;
  color: #666;
  margin-bottom: 4px;
  border-radius: 20px;
  border: 1px solid black;
  //   width : 100px;
  //    display:inline;
  //   padding:0px 2px;
`;

const yearStyle = css`
  font-size: 14px;
  color: #666;
  padding: 0px 2px;
  margin-bottom: 4px;
`;

const typeStyle = css`
  font-size: 14px;
  font-style: italic;
  color: #666;
`;

const cardLeft = css`
  // flex:1
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
  opacity: 0.9;

  &:hover {
    background-color: #88c0ff;
  }
`;

const imageContainer = css`
width: 80%;
// height: 300px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  object-fit: contain;
  background-postition: center;
`;

const image = css`

  object-fit: fill;

  // @media (min-width: 500px) {
  //   width: 300px;
  //   height: 400px;
  // }

  // @media (min-width: 601px) {
  //   margin-right: 0px;
  // }
`;
const DetailsContainer = css`
  display: flex;
  flex-direction: column;
`;

const subTitle = css`
  display: flex;
  justifycontent: center;
  alignitems: center;
  flex-direction: row;
`;
const plotStyle = css`
  font-size: 15px;
  color: #666;
  padding: 5px 2px;
  margin-bottom: 4px;
  font-weight: bold;
  border-bottom: 1px solid #c5c5c5;
`;
const plotStyleDesktop = css`
  font-size: 15px;
  color: #666;
  padding: 5px 2px;
  margin-bottom: 4px;
  font-weight: bold;
  border-bottom: 1px solid #c5c5c5;
  @media (min-width: 301px) {
    visibility: hidden;
  }
`;
const miscStyle = css`
  font-size: 15px;
  color: #666;
  padding: 5px 2px;
  margin-bottom: 4px;
  font-weight: bold;
  border-bottom: 1px solid #c5c5c5;
  @media (min-width: 601px) {
    margin-right: 0px;
  }
`;

const spanStyle = css`
  color: #2b76ae;
  font-size: 13px;
`;

const genreContainer = css`
  display : flex; 
  gap: 2px;
  align-items: center;
  flex-direction : row;
  flex-wrap : wrap;
`
interface IMovieDetailsCard {
  id: string;
  details: IMovieDetails;
}
const MovieDetailsCard = ({ id, details }: IMovieDetailsCard) => {
  const { favmovies, setFavMovies } = useContext(FavMovieContext);
  const [isFav, setIsFav] = useState<boolean>();

  const navigate = useNavigate();

  const handleNavigate = (id: string) => {
    navigate(`/details/${id}`);
  };

  const handleToggleFavorite = (event: any) => {
    event.stopPropagation();
    //  setIsFav(!isFav)
    if (isFav) {
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
  useEffect(() => {
    console.log("called inside details");
    const favValue = favmovies.some((movie) => movie.id == id);
    setIsFav(favValue);
  }, [handleToggleFavorite]);

  return (
    <div className={cardStyle}>
      <div className={titleStyle}>{details.title.english}</div>
      <div className={subTitle}>
        <div className={typeStyle}>{details.type}</div>
        <div className={yearStyle}>{details.Year}</div>

        <div className={yearStyle}>{details.duration} Min</div>
      </div>
      <div className={imageContainer}>
        <img
          className={image}
          draggable="false"
          loading="lazy"
          src={details.coverImage?.large}
          alt="No image"
        />

        {/* <div className={plotStyleDesktop}>
          {details.description.replaceAll("<br>", "")}
        </div> */}
      </div>

      <div className={DetailsContainer}>
      <div className={genreContainer}>
            {
              details.genres?.map((element)=>{
                return <div className={genreStyle}>{element}</div>
              })
            }

            </div>
        <div className={plotStyle}> {details.description}</div>
        <div className={miscStyle}>
          Popularity <span className={spanStyle}> ⭐ {details.popularity}</span>
        </div>
        <div className={miscStyle}>
          Country of Origin{" "}
          <span className={spanStyle}>{details.countryOfOrigin}</span>
        </div>
        <div className={miscStyle}>
          Stars <span className={spanStyle}>{details.duration}</span>
        </div>
      </div>

      <button
        className={favoriteButtonStyle}
        onClick={(event) => handleToggleFavorite(event)}
      >
        {isFav ? "Remove Fav" : "Add Fav"}
      </button>
    </div>
  );
};

export default MovieDetailsCard;
