import React from 'react'
import {Stack, Button} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { valid } from '../../Slice/userSlice';

function StackNav({isHomeActive, isProfileActive , userId}) {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  return (
    <Stack direction='row' spacing={2}>
          <Button 
            sx={{backgroundColor : isHomeActive ? 'white' : '',
                 color : isHomeActive ? '' : 'white',
                 '&:hover':{
                  backgroundColor : isHomeActive ? 'white' : '',
                  boxShadow:1
                 } 
                }}  
            onClick={()=>navigate(`/home/${userId}`)}>
              Home </Button>
          <Button 
            sx={{backgroundColor : isProfileActive ? 'white' : '',
                  color : isProfileActive ? '' : 'white',
                  '&:hover':{
                  backgroundColor : isProfileActive ? 'white' : '',
                  boxShadow:1
                  } 
                }} 
            onClick={()=>navigate(`/profile/${userId}`)}> Profile </Button>
          {/* <Button 
            sx={{backgroundColor : '',
                  color : 'white',
                  '&:hover':{
                  boxShadow:1
                  } 
                }} 
            onClick={()=>navigate('/register')}> New Account </Button> */}
          <Button color='inherit' onClick={()=>{
            dispatch(valid())
            navigate('/')}}> Logout </Button>
        </Stack>
  )
}
export default StackNav