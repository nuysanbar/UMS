// Import necessary modules and components from external libraries
import React from 'react'; // Change * as React to React
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Form, redirect, NavLink } from "react-router-dom";
import axios from 'axios';
import jwt from 'jwt-decode';

// Define an asynchronous function named 'action' that handles form submission
export async function action({ request }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    const apiUrl = 'http://localhost:3500/auth/';
    const response = await axios.post(apiUrl, updates);
    const basicData = {
        image: response.data.foundUser.imgUrl,
        firstName: response.data.foundUser.firstname
    };

    if (response.statusText === "OK") {
        window.localStorage.setItem('access_token', response.data.access_token);
        window.localStorage.setItem('basic_data', JSON.stringify(basicData));
        const user = jwt(response.data.access_token);
        const userRole = user.userInfo.roles;

        if (userRole === "3011") {
            return redirect('/delivery/orders');
        } else if (userRole === "3030") {
            return redirect('/admin/');
        } else {
            return redirect('/home/');
        }
    }
    return 0;
}

// Function component for rendering the sign-in form
function SignIn() {
    // Theme setup
    const defaultTheme = createTheme();

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
                    {/* Display user icon */}
                    <Avatar sx={{ m: 1, bgcolor: 'var(--bl)' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    {/* Sign-in heading */}
                    <Typography component="h1" variant="h5">
                        Log in
                    </Typography>
                    {/* Sign-in form */}
                    <Form component="form" method='post' noValidate sx={{ mt: 1 }}>
                        {/* Username input field */}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        {/* Password input field */}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        {/* Sign-in button */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            style={{backgroundColor:"var(--bl)"}}
                        >
                            Sign In
                        </Button>
                        {/* Forgot password and Sign-up links */}
                        <Grid container>
                            <Grid item xs>
                                <NavLink to={'/forgotPassword'} variant="body2" style={{ color: "var(--bl)" }}>
                                    {"Forgot password?"}
                                </NavLink>
                            </Grid>
                            <Grid item>
                                <NavLink to={'/signUp'} variant="body2" style={{ color: "var(--bl)" }}>
                                    {"Don't have an account? Sign Up"}
                                </NavLink>
                            </Grid>
                        </Grid>
                    </Form>
                </Box>
                {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
            </Container>
        </ThemeProvider>
    );
}

export default SignIn; // Move the export statement to the bottom
