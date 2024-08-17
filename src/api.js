import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common[
  "Authorization"
] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjAwYTU3Y2IwMzcyNmQ1ZmZlNDM0MjRkNDUxNzU1YyIsIm5iZiI6MTcyMzkwMzMyNi43MTIxNiwic3ViIjoiNjZiZjMyODA2NjgwOTA0YzFiNDA2MTVhIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.XE_MudfK2BwFB05u_A0KwE9Hv-gWnS8W3qmeyGqtevI`;
axios.defaults.headers.common["Accept"] = "application/json";

export const getTrendingMovies = async () => {
  const response = await axios.get("/trending/movie/day");
  return response.data;
};

export const getMovies = async (query) => {
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

export const defaultImg =
  'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';


