import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../Context/Auth.context';

export default function ProtectedRoutes({children}) {
  const {token} = useContext(AuthContext);
  
  return (
    <>
        {token ? children : <Navigate to='/login'/>}
    </>
  )
}
