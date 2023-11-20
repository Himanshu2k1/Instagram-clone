import React from 'react';
import Followers from './tableParts/Followers';
import Following from './tableParts/Following';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useMediaQuery} from '@mui/material';

import {Card, Typography} from '@mui/joy';

function Tables() {
  const isXsScreen = useMediaQuery('(max-width:900px)');
  console.log("is small screen",isXsScreen)
  return (
  <Box sx={{maxWidth:'100vw'}}>
     <Card
        variant="outlined"
        orientation="horizontal"
        sx={{
          m:'auto',
          width:'90%',
          height: '4',
          '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
          mb:1,
          backgroundColor:'Highlight'
        }}
      >
      <Typography textAlign={'center'} m='auto'>Your connections</Typography>
      </Card>

      <Grid container spacing={0.5}>
      <Grid item xs={11} sm={10} md={5.5} mx={'auto'}>
        <Followers isXsScreen={isXsScreen}/>
      </Grid>
      <Grid item xs={11} sm={10} md={5.5} mx={'auto'}>
        <Following isXsScreen={isXsScreen} />
      </Grid>
      </Grid>
    </Box>
  );
}
export default Tables;
