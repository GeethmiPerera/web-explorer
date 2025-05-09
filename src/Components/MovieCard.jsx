import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => (
  <Card sx={{ maxWidth: 200 }}>
    <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
      <CardActionArea>
        <CardMedia component="img" image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {movie.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {movie.release_date?.split('-')[0]} | Rating: {movie.vote_average}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Link>
  </Card>
);

export default MovieCard;
