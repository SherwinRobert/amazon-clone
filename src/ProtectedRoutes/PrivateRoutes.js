import React from 'react'
import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({ children, sessionState}) => {
  return (
   sessionState ? children : <Navigate to= {"/"} replace/>
  )
}
