import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
axios.defaults.headers.common[ "Authorization"] = 
`Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzBmZmExNDliN2JlZjg1ZWZmYjRkMWNmODliN2VmOCIsInN1YiI6IjY2NzNlMmYzY2U0NzYxZGM3NGFmNGU4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Tpe5TxRzI9mdR-GaRPu_qbv-BLekgP7D-rxF9VA-FHU`;
// axios.defaults.headers.common["Accept"] = "application/json";


export const getTrendingMovies = async () => {
  const response = await axios.get("trending/movie/week", {
    params: {
      language: "en-US",
    },
  });
  return response.data;
};

export const getMovies = async (query) => {
  const response = await axios.get('search/movie', {
    params: {
      query: query,
    },
  });
  return response.data;
};

export const getMovieDetails = async (movieId) => {
  const response = await axios.get(`movie/${movieId}`);
  return response.data;
};

export const getMovieCast = async (movieId) => {
  const response = await axios.get(`movie/${movieId}/credits`);
  return response.data;
};

export const getMovieReviews = async (movieId) => {
  const response = await axios.get(`movie/${movieId}/reviews`);
  return response.data;
};

export const getImageUrl = (path, size = "w300") => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const defaultImg =
  'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';


