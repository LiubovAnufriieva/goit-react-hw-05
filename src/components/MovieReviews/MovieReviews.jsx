import { useParams } from "react-router-dom";
import css from "./MovieReviews.module.css";
import { useEffect, useState } from "react";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { getMovieReviews } from "../../api";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    async function fetchReviews() {
      try {
        setIsError(false);
        const data = await getMovieReviews(movieId);
        setReviews(data.results);
      } catch (error) {
        setIsError(true);
      }
    }
    fetchReviews();
  }, [movieId]);

  return (
    <div>
      {isError && <ErrorMessage />}
      <ul className={css.reviews_list}>
        {reviews.map((review) => (
          <li key={review.id}>
            <h3>Author: {review.author}</h3>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
