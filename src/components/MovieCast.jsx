import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getMovieCast } from "../api";
import ErrorMessage from "./ErrorMessage/ErrorMessage";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(false);
  
  const location = useLocation();
  const goBack = useRef(location?.state ?? './movies');

  useEffect(() => {
    if (!movieId) return;

    async function fetchCast() {
      try {
        setError(false);
        const data = await getMovieCast(movieId);
        setCast(data.cast);
      } catch (error) {
        setError(true);
      }
    }
    fetchCast();
  }, [movieId]);

  if (error) {
    return <ErrorMessage />;
  }

  if (cast.length === 0) {
    return <div>We don't have cast for this movie.</div> 
  }

  return (
  <ul>
    {cast.map(actor => (
        <li key={actor.id}>
            <p>{actor.name} as {actor.character}</p>
        </li>
    ))}
  </ul>
  )
};

export default MovieCast;
