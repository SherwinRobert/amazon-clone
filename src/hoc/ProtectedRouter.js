import React from "react"
import { Navigate } from "react-router-dom";

const ProtectedRouter = (Component, loggedIn) => {
  console.log("pr", loggedIn)
  return loggedIn? <Component sessionState = { loggedIn } /> : <Navigate to={"/"} replace />
}

export default ProtectedRouter;