import React from "react";
import { Bars, NavMenu, NavLink, Nav } from "./NavbarElement";

const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          <NavLink to="/" activestyle="true">
            Home
          </NavLink>
          <NavLink to="/about" activestyle="true">
            About
          </NavLink>
          <NavLink to="/contact" activestyle="true">
            Contact
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
