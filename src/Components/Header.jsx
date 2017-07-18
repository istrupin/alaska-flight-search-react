import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Flights from './Flights.jsx';
import { Navbar, Nav, NavItem } from 'react-bootstrap';


const Header = () => (
    <Navbar class="navbar navbar-inverse navbar-fixed-top">
        <Navbar.Header>
            <Navbar.Brand>
            <a href="~/">Flights</a>
            </Navbar.Brand>
        </Navbar.Header>

    </Navbar>
)

export default Header;