import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getReviewsById } from  '../../api';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import css from './MovieReviews.module.css';
import { toast, Toaster } from 'react-hot-toast';


const MovieReviews =()=> {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    async function fetchReviewsById() {
      try {
        setIsError(false);
        const data = await getReviewsById(movieId);
        setReviews(data.results);
      } catch (error) {
        setIsError(true);
      }
    }
    fetchReviewsById();
  }, [movieId]);

  if (isError) {
    return <ErrorMessage />;
  }

  if (reviews === null) {
    return <Loader />;
  }

  if (reviews.length === 0) {
  
    return (
    <div className={css.no_review_text}>❌ There is no review for this movie. ❌</div> 
  )
  }

  return (
    <div>
      {isError && <ErrorMessage />}
     
      <ul className={css.reviews_list}>
        {reviews.map(review => (
          <li key={review.id}>
            <h3 className={css.review_title}>Author: {review.author}</h3>
            <p className={css.review_text}> {review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieReviews;

