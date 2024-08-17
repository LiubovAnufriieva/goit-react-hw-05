import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getMovieCast } from "../../api";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import css from "./MovieCast.module.css";
import { defaultImg } from "../../api";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const goBack = useRef(location?.state ?? '/movies');

  useEffect(() => {
    if (!movieId) return;

    async function fetchCast() {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await getMovieCast(movieId);
        setCast(data.cast);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCast();
  }, [movieId]);

  return (
  <div>
    {isError && <ErrorMessage />}
    {isLoading && <Loader />}
    <ul className={css.cast_list}>
      {cast.map(actor => (
          <li key={actor.id} className={css.cast_item}>
            <img
                className={css.cast_img}
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                    : defaultImg
                }
                width={160}
                alt="actor"
              />
              <p className={css.cast_name}>{actor.name} as {actor.character}</p>
          </li>
      ))}
    </ul>
  </div>
  )
};

export default MovieCast;
