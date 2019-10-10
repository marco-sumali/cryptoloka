import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Row, Col } from 'react-bootstrap';
import { getUserProfile } from '../../store/firestore/user/user.actions';
import OrderBuyForm from './orderBuy';
import OrderSellForm from './orderSell';

class OrderForm extends Component {
  componentDidMount() {
    let { getUserProfile, cookies } = this.props
    getUserProfile(cookies)
  }

  render() {
    return (
      <div className="Order-box">
        <Row>
          <Col lg={ 12 }>
            <div className="Order-head-box">
              <div className="Order-head-text">Order Form</div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={ 12 }>
            <div className="Order-form-box">
              <Row>
                <Col lg={ 6 }>
                  <OrderBuyForm match={ this.props.match }/>
                </Col>
                <Col lg={ 6 }>
                  <OrderSellForm match={ this.props.match }/>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile,
    cookies: state.general.cookies,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getUserProfile,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (OrderForm);

