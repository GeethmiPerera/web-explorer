import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails, fetchMovieCredits, fetchMovieTrailer } from '../api/tmdb';
import { Button, Typography, Box, Paper, Chip, Avatar, Stack } from '@mui/material';
import { MovieContext } from '../Context/MovieContext';

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const { favorites, setFavorites } = useContext(MovieContext);

  useEffect(() => {
    const loadMovieDetails = async () => {
      const details = await fetchMovieDetails(id);
      setMovie(details);
    };

    const loadMovieCredits = async () => {
      const credits = await fetchMovieCredits(id);
      setCast(credits.slice(0, 10)); 
    };

    const loadMovieTrailer = async () => {
      const trailer = await fetchMovieTrailer(id);
      setTrailerUrl(trailer);
    };

    loadMovieDetails();
    loadMovieCredits();
    loadMovieTrailer();
  }, [id]);

  const addToFavorites = () => {
    if (movie && !favorites.find((fav) => fav.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFromFavorites = () => {
    setFavorites(favorites.filter((fav) => fav.id !== movie.id));
  };

  const isFavorite = !!favorites.find((fav) => fav.id === movie?.id);

  if (!movie) return <Typography>Loading movie details...</Typography>;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>{movie.title}</Typography>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'start', marginBottom: 2 }}>
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            style={{ borderRadius: 8 }}
          />
        )}
        <Box>
          <Typography variant="h6" gutterBottom>Overview</Typography>
          <Typography paragraph>{movie.overview}</Typography>
          <Typography>
            Genres: {movie.genres.map((genre) => (
              <Chip key={genre.id} label={genre.name} sx={{ marginRight: 1 }} />
            ))}
          </Typography>
          <Typography>Release Date: {movie.release_date}</Typography>
          <Typography>Rating: {movie.vote_average}</Typography>
          <Box sx={{ mt: 2 }}>
            {isFavorite ? (
              <Button variant="outlined" color="secondary" onClick={removeFromFavorites}>
                Remove from Favorites
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={addToFavorites}>
                Add to Favorites
              </Button>
            )}
          </Box>
        </Box>
      </Box>

      {cast.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>Cast</Typography>
          <Stack direction="row" spacing={2} overflow="auto">
            {cast.map((actor) => (
              <Paper key={actor.id} elevation={3} sx={{ padding: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 100 }}>
                <Avatar
                  alt={actor.name}
                  src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : '/broken-image.jpg'} // Handle missing images
                  sx={{ width: 60, height: 60, mb: 1 }}
                />
                <Typography variant="body2" align="center">{actor.name}</Typography>
                <Typography variant="caption" color="text.secondary" align="center">as {actor.character}</Typography>
              </Paper>
            ))}
          </Stack>
        </Box>
      )}

      {trailerUrl && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>Trailer</Typography>
          <iframe
            width="560"
            height="315"
            src={trailerUrl}
            title="Movie Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Box>
      )}
    </Box>
  );
};

export default MoviePage;