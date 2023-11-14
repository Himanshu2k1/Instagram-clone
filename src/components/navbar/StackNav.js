import React from 'react'
import {Stack, Button} from '@mui/material'
import { useNavigate } from 'react-router-dom';

function StackNav({isHomeActive, isProfileActive ,userId}) {
    const navigate=useNavigate();
  return (
    <Stack direction='row' spacing={2}>
          <Button sx={{backgroundColor : isHomeActive ? 'white' : '',
                      color : isHomeActive ? '' : 'white',
                      '&:hover':{
                        backgroundColor : isHomeActive ? 'white' : '',
                        boxShadow:1
                      } 
                    }}  
                      onClick={()=>navigate(`/home/${userId.userId}`)}> Home </Button>
          <Button sx={{backgroundColor : isProfileActive ? 'white' : '',
                      color : isProfileActive ? '' : 'white',
                      '&:hover':{
                        backgroundColor : isProfileActive ? 'white' : '',
                        boxShadow:1
                      } 
                    }} 
                      onClick={()=>navigate(`/profile/${userId.userId}`)}> Profile </Button>
          <Button sx={{backgroundColor : '',
                      color : 'white',
                      '&:hover':{
                        boxShadow:1
                      } 
                    }} 
                      onClick={()=>navigate('/register')}> New Account </Button>
          <Button color='inherit' onClick={()=>navigate('/')}> Logout </Button>
        </Stack>

  )
}

export default StackNav