import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../api";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";

const HomePage = () => {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        async function fetchTrendingMovies() {
            try {
                setIsLoading(true);
                setIsError(false);
                const data = await getTrendingMovies();
                setTrendingMovies(data.results);
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }
        fetchTrendingMovies();
    }, [setTrendingMovies]);
    
  return (
    <div className={css.home_container}>
        <h2  className={css.home_title}>Trending today</h2>
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        {trendingMovies.length > 0  && (
            <MovieList movies={trendingMovies} /> 
        ) }
    </div>
  )
}

export default HomePage