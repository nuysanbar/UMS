//reset password
// Import necessary libraries
//setting up a React component using Material-UI 
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Form,NavLink,redirect} from "react-router-dom"
import axios from 'axios'


export async function action({request}){
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    const url = new URL(request.url);
    const apiUrl=`http://localhost:3500/auth/resetPassword/${url.search}`
     // Send a POST request to the server with the form data
    const response = await axios.post(apiUrl,updates)
    
    // Check if the response status is "OK"
    if(response.data.statusText=="OK"){
      return response.data;
    }else{
      return redirect("../")
    }
}
// Create a default theme using Material-UI's createTheme
const defaultTheme = createTheme();

export default function ResetPassword() {
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
            Change to you preferred password
          </p>
          <Form component="form" method='post' noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              type='password'
              id="password"
              label="New Password"
              name="password"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{backgroundColor:"var(--bl)"}}
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