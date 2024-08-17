import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}className={css.movie_item}>
          <Link to={`/movie/${movie.id}`} state={location} className={css.movie_link}>
            <h3 className={css.title}>{movie.title}</h3>
          </Link>
          
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
