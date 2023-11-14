import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Box,Typography,Container,Link} from '@mui/material';


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
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

export default function Footer() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor:'Highlight',
          // backgroundColor: (theme) =>
          //   theme.palette.mode === 'light'
          //     ? theme.palette.grey[200]
          //     : theme.palette.grey[800],
          position: 'sticky',
          bottom: 0,
          textAlign: 'center', // Center-align the content
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Container>
          <div>
            <Typography variant="body1">Thanks for Visiting!</Typography>
          </div>
          <div>
            <Copyright />
          </div>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
