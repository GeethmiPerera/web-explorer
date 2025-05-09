import React, { useContext } from 'react';
import { FavoritesContext } from '../Context/FavoritesContext';
import MovieCard from '../Components/MovieCard';
import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledHeading = styled(Typography)(({ theme }) => ({
  variant: 'h3', 
  fontWeight: 'bold', 
  color: 'white', 
  padding: theme.spacing(2),
  backgroundColor: 'gray', 
  borderRadius: theme.shape.borderRadius, 
  textAlign: 'center',
  margin: theme.spacing(4, 0),
  textTransform: 'uppercase', 
  letterSpacing: '0.1em', 
}));

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div>
      <StyledHeading>Your Favorite Movies</StyledHeading>
      <Grid container spacing={2}>
        {favorites.map((movie) => (
          <Grid item key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Favorites;
