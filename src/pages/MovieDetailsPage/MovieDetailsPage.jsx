import { useEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { getMovieById, defaultImg } from '../../api';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import css from './MovieDetailsPage.module.css';
import { RiArrowGoBackLine } from "react-icons/ri";


const MovieDetailsPage = ()=> {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const goBack = useRef(location?.state ?? '/movies');

  useEffect(() => {
    if (!movieId) return;

    async function fetchMovieById() {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await getMovieById(movieId);
        setMovie(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieById();
  }, [movieId]);

    const getYear = releaseDate => {
    return releaseDate ? releaseDate.split('-')[0] : 'Unknown Year';
  };

  return (
    <div>
      <div className={css.movie_div}>
        <NavLink className={css.back_link} to={goBack.current}>
           <RiArrowGoBackLine className={css.back_icon}/>&nbsp;Go back
        </NavLink>
      </div>
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      {movie && (
        <div className={css.film_container} key={movie.id}>
          <div className={css.img_wrap}><img 
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : defaultImg
            }
            width={200}
            alt="poster"
          />
            </div>

          <div className={css.movie_info}>
            <h2>
              {movie.title}({getYear(movie.release_date)})
            </h2>
            <p>Rating: {movie.vote_average}</p>
            <h3>Overview</h3>
            <p>{movie.overview}</p>
            <h3>Genres</h3>
            <p>
              {movie.genres.map(genre => (
                <span key={genre.id}>{genre.name} </span>
              ))}
            </p>
          </div>
        </div>
      )}

      <h3 className={css.add_title}>Additional Information</h3>
      <ul className={css.add_list}>
        <li>
          <NavLink className={css.add_item} to="cast">Cast</NavLink>
        </li>
        <li>
          <NavLink className={css.add_item} to="reviews">Reviews</NavLink>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;