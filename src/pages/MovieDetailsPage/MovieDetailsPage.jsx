import { useEffect, useRef, useState } from "react";
import { useLocation, useParams, Outlet, NavLink} from "react-router-dom";
// import { RiArrowGoBackFill } from "react-icons/ri";

import { getMovieDetails } from "../../api";

import css from "./MovieDetailsPage.module.css";
import Loader from "../../components/Loader/Loader";
// import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import BackLink from "../../components/BackLink/BackLink";



const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  // const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const location = useLocation();
  const locationRef = useRef(location.state?.from ?? "/");
 
  
  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setLoading(true);
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div>
      <BackLink to={locationRef.current} className={css.back_link}>
        Go back
      </BackLink>

      
      {isLoading && <Loader />}
      {movie && (
        <div className={css.film_container} key={movie.id}>
          <div className={css.img_wrap}>
          <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt="poster"
          width={300}
        />
          </div>
          <div className={css.movie_info}>
            <h2>
                {movie.title}
            </h2>
            <p>Rating: {movie.vote.average}</p>
            <h3>Overview</h3>
            <p>{movie.overview}</p>
            <h3>Genres</h3>
            <p>
                {movie.genres.map(genre => (
                    <span key={genre.id}>{genre.name}</span>
                ))}
            </p>
          </div>
        </div>
        )}
        <h3 className={css.add_title}>Additional Information</h3>
        <ul className={css.add_list}>
            <li>
                <NavLink to={`/movies/${movieId}/cast`}>Cast</NavLink>
            </li>
            <li>
                <NavLink to={`/movies/${movieId}/reviews`}>Reviews</NavLink>
            </li>
        </ul>
        <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
