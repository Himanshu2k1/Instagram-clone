// importing dependencies
import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// api
import api from '../../api/login'
import '../login/login.css'

// mui imports
import {Avatar,Button, CssBaseline, TextField, Link, Paper, Box, Grid, Typography, } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// importing store-access and reducer
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../Slice/userSlice';

// copyright
function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit">
          Instagram
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}
  
const defaultTheme = createTheme();

function Login() {

// using the store to save and get logger details.
    const dispatch = useDispatch();
    const logger=useSelector((state)=>state.user)
    console.log('check logger',logger)

    const navigate=useNavigate();
    const [users,setUsers]=useState([])

// to fetch data from JSON server using Axios
  useEffect(()=>{
      const fetchUsers=async ()=>{
          try{
              const response= await api.get('/users');
              if(response && response.data) setUsers(response.data)
          }
          catch{
              console.log("error")
          }
      }
      fetchUsers();
  },[dispatch])
console.log('json server working',users);

// on submitting login data, comparing with database
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const obj={
        email:data.get('email'),
        password:data.get('password')
    }
    dispatch(login(obj))

    // logic to validate the user

    var flag=false
    users.forEach((user)=>{
        if(user.email===obj.email && user.password===obj.password){
            flag=true
            navigate(`/home/:${user.email}`)
        }
    })
    if(!flag){
        alert("Enter correct details or Sign-up")
        navigate('/')
    }
};

if(logger && logger.length!==0 ){
    console.log("hello",logger);
}

return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh'}}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 4, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in to
            </Typography>
            <Grid xs={12} sx={{color:'red'}}>
            <Typography component="h1" variant="h3" mt={1}>
              Instagram
            </Typography>
            </Grid>
            
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 4 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link variant="body2" component="button" onClick={()=>navigate('/register')} >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login


