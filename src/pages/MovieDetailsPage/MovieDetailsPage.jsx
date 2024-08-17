import { useEffect, useState, useRef, Suspense } from "react";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";

import { getImageUrl, getMovies } from "../../api";
import css from "./MovieDetailsPage.module.css";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const location = useLocation();
  const goBack = useRef(location?.state ?? "./movies");

  useEffect(() => {
    if (!movieId) return;

    async function fetchMovie() {
      try {
        setLoading(true);
        setError(false);
        const data = await getMovies(movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [movieId]);

  const getYear = releaseDate => {
    return releaseDate ? releaseDate.split('-')[0] : 'Unknown Year';
  };

  return (
    <div>
      <NavLink to={goBack.current} className={css.back_link}>
        <RiArrowGoBackFill />
        &nbsp;Go Back
      </NavLink>
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      {movie && (
        <div className={css.film_container} key={movie.id}>
          <div className={css.img_wrap}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : getImageUrl()
              }
              width={250}
              alt="poster"
            />
          </div>
          <div className={css.movie_info}>
            <h2>
                {movie.title}({getYear(movie.release_date)})
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
                <NavLink to="cast">Cast</NavLink>
            </li>
            <li>
                <NavLink to="reviews">Reviews</NavLink>
            </li>
        </ul>

        <Suspense fallback={<div>Loading subpage...</div>}>
          <Outlet />
        </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
