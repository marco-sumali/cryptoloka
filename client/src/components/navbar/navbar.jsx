import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../assets/css/bootstrap/component/boot.navbar.css';
import '../../assets/css/bootstrap/component/boot.button.css';
import { authSignOut } from '../../store/firestore/auth/auth.actions';

class navbar extends Component {
  render() {
    let {
      hasAuthenticated,
      authSignOut,
      cookies,
    } = this.props
    return (
      <div>
        <Navbar className="Navbar-bg" expand="lg" sticky="top">
          <Navbar.Brand href="/">CRYPTOLOKA</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/exchange/BTC">Exchange</Nav.Link>
            </Nav>
            <Form inline>
              {
                !hasAuthenticated ?
                <div>
                  <Link to="/auth/login">
                    <Button variant="outline-success">Login</Button>
                  </Link>
                  <Link to="/auth/register">
                    <Button variant="outline-success">Register</Button>
                  </Link>
                </div>
                :
                <Link onClick={() => authSignOut(cookies)}>
                  <Button variant="outline-success">Log Out</Button>
                </Link>
              }
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile,
    cookies: state.general.cookies,
    hasAuthenticated: state.auth.hasAuthenticated,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  authSignOut,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (navbar);
