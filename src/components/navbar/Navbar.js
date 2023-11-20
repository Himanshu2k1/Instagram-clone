import React from 'react'
import { AppBar, Toolbar, IconButton, Typography} from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram';

// stack and drawer navbars
import StackNav from './StackNav';
import DrawerNav from './DrawerNav';

import { useMediaQuery } from '@mui/material'

import { useNavigate, useLocation } from 'react-router-dom';


function Navbar({userId}) {
  const navigate=useNavigate();
  const location = useLocation();
  const isHomeActive = location.pathname === `/home/${userId}`;
  const isProfileActive = location.pathname === `/profile/${userId}`;
  const isXsScreen = useMediaQuery('(max-width:900px)');
  return (
    <AppBar color='primary' position='sticky'>
      <Toolbar>
        <IconButton size='medium' sx={{backgroundColor:'ButtonFace', mr:1}} onClick={()=>navigate('/')}>
          <InstagramIcon color='warning'></InstagramIcon>
        </IconButton>

        <Typography variant='h5' component='div' sx={{flexGrow:1}}>Instagram</Typography>
      { isXsScreen ? 
      (<DrawerNav isHomeActive={isHomeActive} isProfileActive={isProfileActive} userId={userId} />)
        :
      (<StackNav isHomeActive={isHomeActive} isProfileActive={isProfileActive} userId={userId}/>)
      }
      </Toolbar>
    </AppBar>
  )
}

export default Navbar