import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {darkMode ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};

export default ThemeToggle;
