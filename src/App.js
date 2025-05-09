import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import MoviePage from './Pages/MoviePage';
import Favorites from './Pages/Favorites';
import Navbar from './Components/Navbar';
import { MovieProvider } from './Context/MovieContext';
import { ThemeProvider, ThemeContext } from './Context/ThemeContext';
import { FavoritesProvider } from './Context/FavoritesContext';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useContext } from 'react';

const AppContent = () => {
  const username = localStorage.getItem('username');
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const theme = createTheme({
    palette: { mode: darkMode ? 'dark' : 'light' },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleTheme} />
        <Routes>
          
          <Route path="/" element={username ? <Navigate to="/home" /> : <Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </MuiThemeProvider>
  );
};

const App = () => {
  return (
    <FavoritesProvider>
      <MovieProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </MovieProvider>
    </FavoritesProvider>
  );
};

export default App;
