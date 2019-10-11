import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { handleChangesRegister, authRegister } from '../../store/firestore/auth/auth.actions';
import '../../assets/css/bootstrap/component/boot.button.css';
import '../../assets/css/bootstrap/component/boot.form.css';
import './auth.css';
import LoadingSvg from '../svg/loading';

class Register extends Component {
  render() {
    let {
      email,
      password,
      handleChangesRegister,
      authRegister,
      loadingStatus,
      cookies,
      validationErrorMessages,
      authError,
    } = this.props
    // console.log('from Register', this.props)
    return (
      <div style={{ minHeight: '90vh' }} className="Container-nowrap-center">
        <Container>
          <Row>
            <Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
              <div className="Auth-box">
                <Form onSubmit={ !loadingStatus ? (e) => authRegister(e, email, password, cookies) : null }>
                  <Row>
                    <Col xs={ 12 }>
                      <div className="Auth-head-box">
                        <div className="Auth-head-text">Register</div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={ 12 }>
                      <Form.Group controlId="regEmail">
                        <InputGroup>
                          <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend"><i className="material-icons Icon-style">person</i></InputGroup.Text>
                          </InputGroup.Prepend>
                          <Form.Control type="email" placeholder="E-mail" onChange={ (e) => handleChangesRegister(e) }/>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={ 12 }>
                      <Form.Group controlId="regPassword">
                        <InputGroup>
                          <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend"><i className="material-icons Icon-style">vpn_key</i></InputGroup.Text>
                          </InputGroup.Prepend>
                            <Form.Control type="password" placeholder="Password" onChange={ (e) => handleChangesRegister(e) }/>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <div className="Auth-error-text">{ authError }</div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      {
                        validationErrorMessages.map((errorMessage, index) => {
                          return (
                            <ul style={{ marginBottom: '0px' }} key={index}>
                              <li>
                                <div className="Auth-error-text Text-left No-margin">{ errorMessage }</div>
                              </li>
                            </ul>
                          ) 
                        })
                      }
                    </Col>
                  </Row>
                  <Row style={{ marginTop: '1em' }}>
                    <Col xs={12}>
                      <Button 
                        variant="primary"
                        disabled={ loadingStatus } 
                        type="submit" 
                        style={{ width: '100%' }}
                      >
                        { 
                          !loadingStatus ? 
                          <div>Start Trading</div> 
                          : 
                          <div className="Container-nowrap-center">
                            <LoadingSvg height="24px" width="24px" color="#ffffff" />
                            <div>Start Trading</div>
                          </div>  
                        }
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={ 12 }>
                      <div className="Auth-foot-box">
                        <div className="Auth-foot-text">Already have an account? <span className="Auth-link"><Link to="/auth/login">Log In</Link></span></div>
                      </div>
                    </Col>
                  </Row>                  
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cookies: state.general.cookies,
    email: state.auth.regEmail,
    password: state.auth.regPassword,
    authError: state.auth.regErrorMessage,
    loadingStatus: state.auth.regLoadingStatus,
    validationErrorMessages: state.auth.regValidationErrorMessages,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  handleChangesRegister,
  authRegister,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (Register);
