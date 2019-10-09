import React, { Component } from 'react';

import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../assets/css/bootstrap/component/boot.navbar.css';

export default class navbar extends Component {
  render() {
    return (
      <div>
        <Navbar className="Navbar-bg" expand="lg" sticky="top">
          <Navbar.Brand href="#home">CRYPTOLOKA</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#link">Exchange</Nav.Link>
            </Nav>
            <Form inline>
              <Link to="/auth/login">
                <Button variant="outline-success">Login</Button>
              </Link>
              <Link to="/auth/register">
                <Button variant="outline-success">Register</Button>
              </Link>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}
