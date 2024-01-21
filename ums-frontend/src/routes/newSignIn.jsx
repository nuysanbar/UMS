import * as React from 'react';
import { NavLink, redirect } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Form } from "react-router-dom";
import axios from 'axios';
import jwt from 'jwt-decode';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AccountCircle from '@mui/icons-material/AccountCircle';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { blue } from '@mui/material/colors';

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

function SignIn() {
    const defaultTheme = createTheme();
    const [showPassword, setShowPassword] = React.useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box
                sx={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '390px',
                    height: '370.69px',
                    margin: 'auto',
                    marginTop: '100px',
                    position: 'relative',
                    backgroundColor: 'white', // Set the background color
                }}
            >
                <CssBaseline />
                <Typography component="h1" variant="h5">
                    Log in
                </Typography>
                <Form component="form" method='post' noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label={<Typography variant="body1" sx={{ fontWeight: 'bold' }}>Username</Typography>}
                        name="username"
                        autoComplete="username"
                        autoFocus
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={<Typography variant="body1" sx={{ fontWeight: 'bold' }}>Password</Typography>}
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="current-password"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOutlinedIcon />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleTogglePassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        style={{ backgroundColor: blue }}
                    >
                        Login
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <NavLink to={'/forgotPassword'} variant="body2" style={{ color: "var(--bl)" }}>
                                {"Forgot password?"}
                            </NavLink>
                        </Grid>
                        <Grid item>
                            <NavLink to={'/signUp'} variant="body2" style={{ color: "var(--bl)" }}>
                                {"New user? Sign Up"}
                            </NavLink>
                        </Grid>
                    </Grid>
                </Form>
            </Box>
        </ThemeProvider>
    );
}

const defaultTheme = createTheme();
export default SignIn;
