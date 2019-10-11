import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../components/exchange/exchange.css';
import OrderBooks from '../../components/exchange/orderBook';
import OrderForms from '../../components/exchange/orderForm';
import { Container, Row, Col} from 'react-bootstrap';
import { getUserProfile } from '../../store/firestore/user/user.actions';
import { Redirect } from 'react-router-dom';

class ExchangePage extends Component {
  componentDidMount() {
    let { getUserProfile, cookies } = this.props
    getUserProfile(cookies)
  }
  
  render() {
    let {
      match,
      hasAuthenticated
    } = this.props
    return (
      <div className="Exchange-page-box">
        {
          !hasAuthenticated ?
          <Redirect to="/auth/login" />
          :
          <Container>
            <Row>
              <Col lg={ 12 }>
                <OrderBooks match={ match }/>
              </Col>
            </Row>
            <Row>
              <Col lg={ 12 }>
                <OrderForms match={ match }/>
              </Col>
            </Row>
          </Container>
        }
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
  getUserProfile,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (ExchangePage);