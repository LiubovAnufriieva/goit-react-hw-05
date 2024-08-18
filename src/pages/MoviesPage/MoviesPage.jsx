import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../api";
// import Loader from "../../components/Loader/Loader";
// import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from "../../components/MovieList/MovieList";
// import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);
  const query = searchParams.get('query');
  const [searchParams, setSearchParams] = useSearchParams();
  // const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    
    async function fetchMovies() {

      try {
        // setIsLoading(true);
        // setIsError(false);
        const data = await searchMovies(query);
        setMovies(data.results);
        // setNotFound(data.results.length === 0);
      } catch (error) {
        console.log(error);
      } 
    }
    fetchMovies();
  }, [query]);

 
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const inputValue = form.elements.query.value;
    setSearchParams({ query: inputValue });
    form.reset();
  };

  return (
    <div>
      <SearchBar onSearch={handleSubmit} />
     
      {movies.length > 0  && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
