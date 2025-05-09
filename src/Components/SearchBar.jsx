import React from 'react';
import { TextField } from '@mui/material';

const SearchBar = ({ value, onChange }) => {
  const handleChange = (event) => {
    onChange(event);
    localStorage.setItem('lastSearch', event.target.value); // Store in local storage
  };

  return (
    <TextField
      label="Search Movies"
      variant="outlined"
      fullWidth
      value={value}
      onChange={handleChange}
      sx={{ my: 2 }}
    />
  );
};

export default SearchBar;