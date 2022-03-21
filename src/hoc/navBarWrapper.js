import React from "react";
import NavBar from "../components/navbar/navbar.jsx"

export const NavBarWrapper = ({ children,...rest}) => {
  return (
      <div>
          <NavBar {...rest} />
          {children}
    </div>
  )
}