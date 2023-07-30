import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { MovieContext } from "../../context/MovieContext";
import { useNavigate } from "react-router-dom";
// import "./movielistStyles.css";
import { css } from "@emotion/css";
import MovieCard from "../MovieCard/MovieCard";
import { getAnime } from "../../services/getAnime";

import Loading from "../Loading/Loading";
import Button from "../Button/Button";

const moviecontainer = css`
  display: grid;
  margin-top: 200px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  place-items: center;
  grid-template-columns: 1fr 1fr; /* Two columns for desktop and tablet view */

  @media (max-width: 768px) {
    /* One column for mobile view */
    grid-template-columns: 1fr;
  }
`;
const navContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const headingStyle = css`
  margin: 0px;
  flex: 1;
  text-transform: uppercase;
  color: #c5c5c5;
`;

const buttonStyle = css`
  color: white;
  background-color: #4f4f4f;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 1);
  padding: 4px 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;

  &:hover {
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  }
`;
const flexContainer = css`
display : flex ;
justify-content : center;
align-items : center;
height : 100vh; 
width: 100%;
`;

const ScrollContainer = css`
  width: 100%;
  height: 200px;
  display : flex;
  justify-content : center;
  align-items : center;

`

const MovieList = () => {
  // const color = "darkgreen";
  const { movies, setMovies } = useContext(MovieContext);
  const [visibleMovies, setVisibleMovies] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
 
  const navigate = useNavigate();
  const listRef = useRef<HTMLDivElement>(null);

  const handleNavigate = () => {
    setVisibleMovies([]);
    setTimeout(() => {
      navigate("/favmovies");
    }, 100);
  };

 
  const loadMoreMovies = useCallback(() => {
    setCurrentPage(currentPage + 1);
  }, [visibleMovies.length]);

  useEffect(() => {

    const func = async () => {
      interface Iresult {
        data: { Page: { media: any } };
      }
      const result = (await getAnime(currentPage, 5)) as any;

      const data: any = result.data.Page.media;
      setVisibleMovies([...visibleMovies, ...data]);
      setMovies([...visibleMovies, ...result.data.Page.media]);
    };
    func();
  
  }, [currentPage]);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        loadMoreMovies();
      }
    },
    [loadMoreMovies]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 1.0,
    });
    if (listRef.current) {
      observer.observe(listRef.current);
    }
    //unmount
    return () => {
      if (listRef.current) {
        observer.unobserve(listRef.current);
      }
    };
  }, [handleIntersection]);

  useEffect(() => {
    const func = async () => {
      const result = await getAnime(1, 5);
 
      setLoading(false);
      setVisibleMovies(result.data.Page.media);
      setMovies(result.data.Page.media);
    };
    func();
  }, []);

  return (
    <>
      {loading ? (
        <div className={flexContainer}>
          <Loading />
        </div>
      ) : (
        <div>
          <div
            className={css({
              width: "100%",
              fontSize: "2rem",
              textAlign: "center",
              position: "fixed",
              zIndex: 10,
              backgroundColor: "gray",
              padding: "20px 0px",
              margin: "0px",
              top: "0px",
              left: "0px",
            })}
          >
            <h3 className={headingStyle}>Trending Animes</h3>
            <button className={buttonStyle} onClick={handleNavigate}>
              My Favourites
            </button>
          </div>

          <div className={moviecontainer}>
            {visibleMovies && visibleMovies.length != 0
              ? visibleMovies.map((movie: any) => {
                  return (
                    <MovieCard
                      coverImage={movie.coverImage}
                      key={movie.id}
                      id={movie.id}
                      title={movie.title}
                      genres={movie.genres}
                      type={movie.type}
                    />
                  );
                })
              : ""}
          </div>
          <div className={ScrollContainer}>
           <Button bgcolor ="#33ff" text="Scroll for More"/>
          
            </div>
        </div>
      )}
      <div ref={listRef} />
    </>
  );
};

export default MovieList;
