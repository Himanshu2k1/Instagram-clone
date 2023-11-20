import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import Tables from '../../components/user/tables/Tables';
import User from '../../components/user/User';

// import { useMediaQuery } from '@mui/material';

function Profile() {
  const userId = useParams();
  // const isXsScreen = useMediaQuery('(max-width:900px)');
  return (
  //user header
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
      <Navbar style={{ zIndex: 1000 }} userId={userId.userId}/>
      <User/>
      <Tables />
      <div style={{ marginTop: 'auto' }}><Footer /></div>
    </div>
  );
}

export default Profile;
