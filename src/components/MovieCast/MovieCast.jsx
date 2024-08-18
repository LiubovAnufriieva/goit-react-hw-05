import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { getCastById } from  '../../api';
import { defaultImg } from  '../../api'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import css from './MovieCast.module.css';


export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const [isError, setIsError] = useState(false);
  
  useEffect(() => {
    if (!movieId) return;

    async function fetchCastById() {
      try {
        setIsError(false);
        const data = await getCastById(movieId);
        setCast(data.cast);
      } catch (error) {
        setIsError(true);
      }
    }
    fetchCastById();
  }, [movieId]);

  if (isError) {
    return <ErrorMessage />;
  }

  if (!cast) {
    return <Loader />;
  }

  if (cast.length === 0) {
    return <div>We don't have cast for this movie.</div>;
  }

  return (
    <div>
      {isError && <ErrorMessage />}
      <div>
        <ul className={css.cast_list}>
          {cast.map(actor => (
            <li className={css.cast_card} key={actor.id}>
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
              <p className={css.cast_name}>{actor.name}</p>
              <p className={css.cast_name}>
                as {actor.character}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}