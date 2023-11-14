import React from 'react'

import { useParams } from 'react-router-dom'

import Navbar from '../../components/navbar/Navbar'
import Timeline from '../../components/timeline/Timeline'
import Suggestions from '../../components/suggestions/Suggestions'
import Footer from '../../components/footer/Footer'
import Grid from '@mui/material/Grid';

function Home() {
  const params=useParams();
  return (
    <>
    <div><Navbar userId={params.userId}/></div>
    <Grid container mt={1.5}>
    <Grid item xs={12} sm={12} md={6}>
      <div><Timeline /></div>
    </Grid>
    <Grid item xs={12} sm={12} md={6}>
      <div><Suggestions /></div>
    </Grid>    
  </Grid>
  <div>
    <Footer />
  </div>
  </>
  )
}

export default Home