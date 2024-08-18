import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common[
  "Authorization"
] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjAwYTU3Y2IwMzcyNmQ1ZmZlNDM0MjRkNDUxNzU1YyIsIm5iZiI6MTcyMzk2MzIzNy40NzM5MDksInN1YiI6IjY2YmYzMjgwNjY4MDkwNGMxYjQwNjE1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i4EdyiKdzsEIUHIy9sc5WoxhJ9e_V9gGuJF00xJzSR0`;
axios.defaults.headers.common["Accept"] = "application/json";

export const getTrendingMovies = async () => {
  const response = await axios.get("/trending/movie/week", {
    params: {
      language: "en-US",
    },
  });
  return response.data;
};

export const getMovieById = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}`);
  return response.data;
};

export const getMovies = async (searchQuery) => {
  const response = await axios.get("/search/movie", {
    params: {
      query: searchQuery
    },
  });
  return response.data;
};

export const getCastById = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/credits`);
  return response.data;
};

export const getReviewsById = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/reviews`, {
    params: {
      language: "en-US",
      page: "1",
    },
  });
  return response.data;
};

export const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";
