import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common[
  "Authorization"
] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzBmZmExNDliN2JlZjg1ZWZmYjRkMWNmODliN2VmOCIsInN1YiI6IjY2NzNlMmYzY2U0NzYxZGM3NGFmNGU4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Tpe5TxRzI9mdR-GaRPu_qbv-BLekgP7D-rxF9VA-FHU`;
axios.defaults.headers.common["Accept"] = "application/json";

export const getTrendingMovies = async () => {
  const response = await axios.get("/trending/movie/day");
  return response.data;
};

export const searchMovies = async (query) => {
  const response = await axios.get("/search/movie", {
    params: {
      query,
    },
  });
  return response.data;
};

export const getMovieDetails = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}`);
  return response.data;
};

export const getMovieCast = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/credits`);
  return response.data;
};

export const getMovieReviews = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/reviews`);
  return response.data;
};

export const getImageUrl = (path, size = "w300") => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
