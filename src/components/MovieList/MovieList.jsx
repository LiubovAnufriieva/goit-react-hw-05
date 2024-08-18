import { NavLink, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ movies }) =>{
  const location = useLocation();

  return (
    <ul className={css.list_container}>
      {movies.map(movie => (
        <li key={movie.id} className={css.movie_item}>
          <NavLink
            className={css.movie_link}
            to={`/movies/${movie.id}`}
            state={location}
          >
            <h3>{movie.title}</h3>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;