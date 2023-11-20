import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function RequireAuth({ children }) {
    const logger=useSelector((state)=>state.user)
    const location = useLocation();
    console.log(location)
  
    return logger.validated ? (
      children
    ) : (
      <Navigate to="/" replace state={{ path: location.pathname }} />
    );
  }

export default RequireAuth