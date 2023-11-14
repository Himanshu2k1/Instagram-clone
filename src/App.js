import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Registration from './pages/registration/Registration';
import Profile from './pages/profile/Profile';
import Newpost from './pages/post/Newpost';
import { useMediaQuery } from '@mui/material';

function App() {
  const screen=useMediaQuery('(min-width:375px)')
  return (
    !screen ? alert("Screen size Unsupported") :
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/home/:userId' element={<Home />}></Route>
        <Route path='/register' element={<Registration />}></Route>
        <Route path='/profile/:userId' element={<Profile />}></Route>
        <Route path='/newpost/:userId' element={<Newpost />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
