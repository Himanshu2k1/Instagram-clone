import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate} from 'react-router-dom';

const drawerWidth = 150;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
    position: 'relative',
  }),
);
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function DrawerNav({isHomeActive,isProfileActive,userId}) {
    const navigate=useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' , maxHeight:'30px'}}>
      <CssBaseline />
        <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="end"
        onClick={handleDrawerOpen}
        sx={{ ...(open && { display: 'none' }) , '&:hover':{

        }}}
        >
        <MenuIcon />
        </IconButton>
      <Main open={open}>
        <DrawerHeader />
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        <ListItem key="Home" disablePadding>
          <ListItemButton sx={{backgroundColor : isHomeActive ? 'white' : 'black',
                      color : isHomeActive ? 'blue' : 'white',
                      '&:hover':{
                        backgroundColor : isHomeActive ? 'white' : 'black',
                        boxShadow:1
                      },
                      textAlign: 'center' 
                    }}
                    onClick={()=>navigate(`/home/${userId.userId}`)}>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Profile" disablePadding>
          <ListItemButton sx={{backgroundColor : isProfileActive ? 'white' : 'black',
                      color : isProfileActive ? 'blue' : 'white',
                      '&:hover':{
                        backgroundColor : isProfileActive ? 'white' : 'black',
                        boxShadow:1
                      },
                      textAlign: 'center' 
                    }}
                    onClick={()=>navigate(`/profile/${userId.userId}`)}>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Register" disablePadding>
          <ListItemButton sx={{backgroundColor : 'black',
                      color : 'white',
                      '&:hover':{
                        boxShadow:1,
                        backgroundColor: 'black'
                      }, 
                      textAlign: 'center'
                    }}
                    onClick={()=>navigate('/register')}>
            <ListItemText primary="New Account" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Logout" disablePadding>
          <ListItemButton sx={{backgroundColor : 'black',
                      color : 'white',
                      '&:hover':{
                        boxShadow:1,
                        backgroundColor: 'black'
                      },
                      textAlign: 'center' }} onClick={()=>navigate('/')}>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
        <Divider />
      </Drawer>
    </Box>
  );
}
