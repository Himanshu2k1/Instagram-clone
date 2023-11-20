
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {Avatar, Button,CssBaseline, TextField, Link, Grid, Box, Typography, Container} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { posted } from '../../Slice/postsSlice';
import { useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';

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
      <Link color="inherit">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();
function Newpost() {

  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [caption,setCaption]=useState('');
  const [image,setImage]=useState();
  const userId=useParams();
  const logger=userId.userId.slice(1);
  console.log("logger in add post ",logger);
  
  const convert2base64 = (e) => {
      console.log(e.target.files[0]);
      const file=e.target.files[0];
      const reader=new FileReader();

      reader.onloadend=()=>{
        setImage(reader.result.toString());
      };
      reader.readAsDataURL(file);
  }

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
            Upload New Post
          </Typography>
          <Box component="form" noValidate sx={{ mt: 5 }}>
            <Grid container spacing={2}>

              <Grid item xs={12} ml={15}>
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                  Upload Image
                  <VisuallyHiddenInput type="file" id="imageUploaded" onChange={(e)=>convert2base64(e)}/>
                </Button>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="caption"
                  required
                  fullWidth
                  id="caption"
                  label="Caption"
                  value={caption}
                  autoFocus
                  onChange={(event)=>setCaption(event.target.value)}
                />
              </Grid>
              
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e)=>{
               e.preventDefault(); 
               dispatch(posted({
               img:image,
               Caption:caption,
               user:logger
            }))
            alert("post added");
            navigate(`/profile/${userId.userId}`)
            }}
            >
                POST
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link variant="body2" component="button" onClick={()=>navigate(`/profile/${userId.userId}`)}>
                  Back to Profile
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

export default Newpost