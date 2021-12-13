import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from "shards-react";

class MenuBar extends React.Component {
    render() {
        return(
        <Navbar type="dark" theme="primary" expand="md">
          <NavbarBrand href="/">
            Home
          </NavbarBrand>
          <Nav navbar>
            <NavItem>
              <NavLink active href="/page/covidcountry">
                2020 Olympics
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active  href="/olympics/year">
                Year
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active  href="/olympics/year/country">
                Country
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active  href="/olympics/sports">
                Sports
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        
       );
    }
}

export default MenuBar
