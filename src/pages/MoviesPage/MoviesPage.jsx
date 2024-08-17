import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import MovieList from '../../components/MovieList/MovieList';
import SearchBar from '../../components/SearchBar/SearchBar';
import { getMovieReviews } from '../../api';

const MoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const query = searchParams.get('query') ?? '';
        if (query.trim() === '') {
            return
        }
        async function fetchMovies() {
            try {
                setIsLoading(true);
                setIsError(false);
                const data = await getMovieReviews(query);
                setMovies(data.results);
                setNotFound(data.results.length === 0);
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }
        fetchMovies();
    }, [searchParams]);

    const handleSubmit = async value => {
        setSearchParams({ query: value });
    }
  return (
    <div>
        <SearchBar onSearch={handleSubmit}/>
        {isError && <ErrorMessage />}
        {!isLoading && !isError && <MovieList movies={movies}/>}
        {isLoading && <Loader />}
        {notFound && (
            <p>Sorry, there is no movie, matching your request ... 😭</p>
            )}
    </div>
  );
}

export default MoviesPage