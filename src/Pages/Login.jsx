// src/Pages/Login.jsx
import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Alert, Paper, Box } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f44336', 
    },
    secondary: {
      main: '#3f51b5', 
    },
    background: {
      default: '#f0f0f0', 
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh', 
          padding: '32px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '32px',
          borderRadius: '8px',
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '400px', 
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h4: {
          marginBottom: '24px',
          color: '#333',
          textAlign: 'center',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '16px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '12px 24px',
          fontSize: '1rem',
          fontWeight: 500,
          borderRadius: '4px',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          marginBottom: '16px',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          color: '#3f51b5',
          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
    },
  },
});

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username && password) {
      localStorage.setItem('username', username);
      navigate('/home');
    } else {
      setError('Please enter both username and password.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Paper elevation={3}>
          <Typography variant="h4" gutterBottom>
            Log In
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined" 
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined" 
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleLogin} sx={{ mt: 2 }}>
            Log In
          </Button>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Login;