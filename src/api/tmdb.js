import axios from 'axios';

const apiKey = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: apiKey,
  },
});

export const fetchTrendingMovies = async () => {
  try {
    const response = await api.get('/trending/movie/day');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await api.get('/search/movie', {
      params: {
        query: query,
        page: page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for movie ID ${movieId}:`, error);
    return null;
  }
};

export const fetchMovieCredits = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/credits`);
    return response.data.cast;
  } catch (error) {
    console.error(`Error fetching credits for movie ID ${movieId}:`, error);
    return [];
  }
};

export const fetchMovieTrailer = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/videos`);
    const trailer = response.data.results.find((video) => video.type === 'Trailer');
    return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
  } catch (error) {
    console.error(`Error fetching trailer for movie ID ${movieId}:`, error);
    return null;
  }
};