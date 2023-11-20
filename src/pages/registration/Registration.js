import React from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../../api/login'
import validator from 'validator';
import { useState } from 'react';
import { fetchSuggestions } from '../../Slice/suggestionsSlice';
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
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
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'center',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
function Registration() {

  const dispatch=useDispatch();
  const suggestions=useSelector((state)=>state.suggestions);
  const [emailError, setEmailError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [image,setImage]=useState();
  const [isFormValid, setIsFormValid] = useState(false); 
  const navigate=useNavigate();

  useEffect(()=>{
    dispatch(fetchSuggestions())
  },[dispatch])

  const validateEmail = (e) => {
    var email = e.target.value 
  
    if (validator.isEmail(email)) { 
      if(suggestions.users.findIndex(user => user.email === email)!==-1){
        setEmailError('Email already registered');
        setIsFormValid(false);
      }
      else{
        setEmailError('Valid Email :)');
      } 
    } else { 
      setEmailError('Enter valid Email!');
      setIsFormValid(false); 
    } 
  }   
  const validate = (value) => { 
    if (validator.isStrongPassword(value, { 
        minLength: 8, minLowercase: 1, 
        minUppercase: 1, minNumbers: 1, minSymbols: 1 
    })) { 
        setErrorMessage('Strong Password');
        setIsFormValid(true); 
    } else { 
        setErrorMessage('*Choose a strong Password, min. length:8, min. lowercase letter:1, min. uppercase letter 1, min. Symbols 1 ') 
        setIsFormValid(false);
    } 
    }
    
    const handleFirstNameChange = (e) => {
      const firstName = e.target.value.trim(); // Trim whitespace
      setIsFormValid(firstName !== '' && document.getElementById('lastName').value.trim() !== '' && emailError === 'Valid Email :)' && errorMessage === 'Strong Password');
    };
  
    const handleLastNameChange = (e) => {
      const lastName = e.target.value.trim(); // Trim whitespace
      setIsFormValid(document.getElementById('firstName').value.trim() !== '' && lastName !== '' && emailError === 'Valid Email :)' && errorMessage === 'Strong Password');
    };

    const convert2base64 = (e) => {
      console.log(e.target.files[0]);
      const file=e.target.files[0];
      const reader=new FileReader();

      reader.onloadend=()=>{
        setImage(reader.result.toString());
      };
      reader.readAsDataURL(file);
    }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (emailError === 'Valid Email :)') {
  
    let obj={
        id:data.get('email'),
        img: image,
        fname:data.get('firstName'),
        lname:data.get('lastName'),
        email: data.get('email'),
        password: data.get('password'),
        followers: [
          {
            followers_list: [
            ]
          }
        ],
        following: [
          {
            following_list: [
            ]
          }
        ],
        bio: data.get('bio')
    };

    try{
      const response=await api.post('/users',obj);
      console.log(response.data);
      alert("Thanks for registering with us!");
      navigate('/')
    }
    catch(error){
      console.log(`'Error',${error.message}`)
    }
    console.log(obj);

    }

    else{
      if(emailError==='Email already registered'){
        alert("email already registered, please login");
        navigate('/');
      }
      else{
        alert("enter a valid email");
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 5 }}>
            <Grid container spacing={1} justifyContent="center">

              <Grid item xs={11} mx={'auto'} textAlign="center">
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                  Upload Image
                  <VisuallyHiddenInput type="file" onChange={(e)=>convert2base64(e)} />
                </Button>
              </Grid>

              <Grid item mx={'auto'} xs={11} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onChange={(e)=>handleFirstNameChange(e)}
                  autoFocus
                />
              </Grid>
              <Grid item mx={'auto'} xs={11} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  onChange={(e)=>handleLastNameChange(e)}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item mx={'auto'} xs={11}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e)=>validateEmail(e)}
                />
                {emailError === '' ? null : 
                    <span style={{ 
                        fontWeight: 'lighter', 
                        color: emailError==='Valid Email :)' ? 'green': 'red', 
                    }}>{emailError}</span>} 
              </Grid>
              <Grid item mx={'auto'} xs={11}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Set Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => validate(e.target.value)}
                />
                {errorMessage === '' ? null : 
                    <span style={{ 
                        fontWeight: 'lighter', 
                        color: errorMessage==='Strong Password' ? 'green': 'red', 
                    }}>{errorMessage}</span>} 
              </Grid>
              <Grid item mx={'auto'} xs={11}>
                <TextField
                  required
                  multiline
                  rows={3}
                  fullWidth
                  name="bio"
                  label="Set Bio"
                  id="bio"
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isFormValid}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link variant="body2" component="button" onClick={()=>navigate('/')}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Registration