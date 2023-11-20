import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Timeline from '../../components/timeline/Timeline'
import Suggestions from '../../components/suggestions/Suggestions'
import Footer from '../../components/footer/Footer'
import Grid from '@mui/material/Grid';

import { Button, useMediaQuery } from '@mui/material'

function Home() {
  const params=useParams();
  const isXsScreen = useMediaQuery('(max-width:900px)');
  const [feed,setFeed]=useState(true);
  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <div><Navbar userId={params.userId}/></div>
    <Grid container mt={1.5}>
    {isXsScreen && <Grid item xs={12} mx={'auto'} textAlign={'center'}>
       <Button onClick={(prevState)=>{ setFeed(true)}}>Feed</Button>
       <Button onClick={(prevState)=>{setFeed(false)}}>Search</Button>
       </Grid>}
    
    {isXsScreen ? (feed ? (<Grid item xs={12} sm={12} md={6}>
                          <div><Timeline isXsScreen={isXsScreen}/></div>
                          </Grid>) :  (<Grid item xs={12} sm={12} md={6}>
                                      <div><Suggestions isXsScreen={isXsScreen}/></div>
                                      </Grid>) ) :
    (<>
    <Grid item xs={12} sm={12} md={6}>
      <div><Timeline isXsScreen={isXsScreen}/></div>
    </Grid>
    <Grid item xs={12} sm={12} md={6}>
      <div><Suggestions isXsScreen={isXsScreen}/></div>
    </Grid>
    </>)
  }    
  </Grid>
  <div style={{ marginTop: 'auto' }}>
    <Footer />
  </div>
  </div>
  </>
  )
}

export default Home