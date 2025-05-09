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
      main: '#ff9800',
    },
    background: {
      default: '#f5f5f5', 
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif', 
    h4: {
      fontWeight: 600,
    },
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
          borderRadius: '12px',
          boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '400px',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h4: {
          marginBottom: '24px',
          color: '#222',
          textAlign: 'center',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '20px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '14px 28px',
          fontSize: '1.1rem',
          fontWeight: 500,
          borderRadius: '6px',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          marginBottom: '20px',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          color: '#ff9800',
          fontWeight: 500,
          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
    },
  },
});

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!username || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    localStorage.setItem('username', username);
    setSuccess('Signup successful! Redirecting to login...');
    setError('');
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Paper elevation={3}>
          <Typography variant="h4" gutterBottom>
            Sign Up
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
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
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            variant="outlined"
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleSignup} sx={{ mt: 2 }}>
            Sign Up
          </Button>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              Already have an account? <Link to="/">Log In</Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Signup;