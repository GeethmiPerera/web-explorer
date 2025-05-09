import React, { useState, useEffect } from 'react';
import { fetchTrendingMovies, searchMovies } from '../api/tmdb';
import { InputBase, Button, Box, Typography, Grid } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { Search } from '@mui/icons-material'; 
import MovieCard from '../Components/MovieCard';

const StyledSearchBar = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
  display: 'flex', 
  alignItems: 'center', 
}));

const StyledSearchIconWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none', 
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const StyledHeading = styled(Typography)(({ theme }) => ({
  variant: 'h4', 
  fontWeight: '600', 
  color: 'purple', 
  marginTop: theme.spacing(4), 
  marginBottom: theme.spacing(3), 
  textAlign: 'center', 
  textTransform: 'uppercase', 
  letterSpacing: '0.1em', 
}));

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState(() => localStorage.getItem('lastSearch') || '');
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTrending = async () => {
      try {
        const trendingMovies = await fetchTrendingMovies();
        setTrending(trendingMovies);
        setError(null);
      } catch (err) {
        console.error('Error fetching trending movies:', err);
        setError('Failed to load trending movies.');
      }
    };
    loadTrending();
  }, []);

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
    if (query) {
      loadMovies(1);
    }
  }, [query]);

  const loadMovies = async (newPage = page) => {
    if (!query) return;
    setLoading(true);
    try {
      const results = await searchMovies(query, newPage);
      if (results && results.length > 0) {
        setMovies((prevMovies) => [...prevMovies, ...results]);
        setPage((prevPage) => prevPage + 1);
        setHasMore(results.length >= 20); // Assuming API returns 20 results per page
      } else {
        setHasMore(false);
      }
      setError(null);
    } catch (err) {
      console.error('Error loading movies:', err);
      setError('Failed to load movies. Please try again.');
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    localStorage.setItem('lastSearch', newQuery);
  };

  const handleLoadMore = () => {
    loadMovies(page);
  };

  return (
    <div>
      <StyledSearchBar>
        <StyledSearchIconWrapper>
          <Search />
        </StyledSearchIconWrapper>
        <StyledInputBase
          placeholder="Search movies..."
          inputProps={{ 'aria-label': 'search' }}
          value={query}
          onChange={handleSearch}
        />
      </StyledSearchBar>
      <StyledHeading>
        {query ? `Search Results for "${query}"` : 'Trending Movies'}
      </StyledHeading>
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={2}>
        {(query ? movies : trending).map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
        {loading && <Typography>Loading movies...</Typography>}
      </Grid>
      {query && hasMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <Button variant="contained" onClick={handleLoadMore} disabled={loading}>
            Load More
          </Button>
        </Box>
      )}
      {!hasMore && query && movies.length > 0 && (
        <Typography textAlign="center" mt={2}>
          No more results found.
        </Typography>
      )}
      {!hasMore && query && movies.length === 0 && !loading && (
        <Typography textAlign="center" mt={2}>
          No movies found for this search.
        </Typography>
      )}
    </div>
  );
};

export default Home;
