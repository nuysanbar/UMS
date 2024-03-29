//Import necessary libraries
import * as React from 'react';
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import Icon from '@mui/material/Icon';
import InputAdornment from '@mui/material/InputAdornment';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Form,redirect,NavLink} from "react-router-dom"
import axios from 'axios'

// Define an asynchronous function called action that takes an object with a request property
export async function action({request}){
  // Extract form data from the request
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    
    // Define the API URL for the forgot password endpoint
    const apiUrl='http://localhost:3500/auth/forgotPassword/'
    const response = await axios.post(apiUrl,updates)
    console.log(response.data)
    return response.data;
}

const defaultTheme = createTheme();

export default function ForgotPassword() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <p style={{color:"var(--bl)"}}>
            Enter your email for the verification process, we will send a code to your email..
          </p>
          <Form component="form" method='post' noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            type='email'
            id="email"
            label="Email"
            name="email"
            autoComplete="username"
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon>
                    email
                  </EmailIcon>
                </InputAdornment>
              ),
            }}
          />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{backgroundColor:"blue"}}
            >
              continue
            </Button>
            <NavLink to={'/signUp'} variant="body2"style={{color:"var(--bl)"}}>
                  {"Don't have an account? Sign Up"}
            </NavLink>
          </Form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}