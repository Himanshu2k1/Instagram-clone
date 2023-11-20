import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Box,Typography,Container} from '@mui/material';

// copyright Element code
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      Copyright © Instagram {new Date().getFullYear()}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Footer() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor:'Highlight',
          position: 'sticky',
          bottom: 0,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Container>
          <Typography variant="body1">Thanks for Visiting!</Typography>
          <Copyright />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
