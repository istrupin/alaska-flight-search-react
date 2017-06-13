import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom'


const Header = () => (
    <Navbar>
        <Navbar.Header>
            <Navbar.Brand>
                <a href="#">Alaska Airlines</a>
            </Navbar.Brand>
        </Navbar.Header>
        <Nav>
            <NavItem eventKey={1} href="#">Link</NavItem>
            <NavItem eventKey={2} href="#">Link</NavItem>
        </Nav>
    </Navbar>
)

export default Header;