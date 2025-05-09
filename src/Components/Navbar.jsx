import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from '../Context/ThemeToggle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/'); 
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          <Link to={isLoggedIn ? "/home" : "/"} style={{ textDecoration: 'none', color: 'inherit' }}>
            Movie Explorer
          </Link>
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ThemeToggle />
          {!isLoggedIn && (
            <Button color="inherit" component={Link} to="/signup" sx={{ mr: 2 }}>
              Sign Up
            </Button>
          )}
          {isLoggedIn ? (
            <>
              <IconButton color="inherit" component={Link} to="/favorites" sx={{ mr: 2 }}>
                <FavoriteIcon />
              </IconButton>
              <Button color="inherit" onClick={handleLogout} sx={{ mr: 2 }}>
                Logout
              </Button>
              <IconButton color="inherit" component={Link} to="/profile"> {/* profile page is not implemented */}
                <AccountCircle />
              </IconButton>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;