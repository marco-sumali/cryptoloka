import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Row, Col, Tabs, Tab } from 'react-bootstrap';
import '../../assets/css/bootstrap/component/boot.tabs.css';
import OrderBuyForm from './orderBuy';
import OrderSellForm from './orderSell';

class OrderForm extends Component {
  render() {
    return (
      <div className="Order-box">
        <Row>
          <Col xs={ 12 }>
            <div className="Order-head-box">
              <div className="Order-head-text">Order Form</div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={ 12 }>
            <div className="Order-form-box Web-order-form-box">
              <Row>
                <Col md={ 6 }>
                  <OrderBuyForm match={ this.props.match }/>
                </Col>
                <Col md={ 6 }>
                  <OrderSellForm match={ this.props.match }/>
                </Col>
              </Row>
            </div>
          </Col>
          <Col xs={ 12 }>
            <div className="Order-form-box Mobile-order-form-box">
              <Row>
                <Col xs={12}>
                  <div className="">
                    <Tabs defaultActiveKey="buy" transition={false} id="noanim-tab-example">
                      <Tab eventKey="buy" title="Buy">
                        <Row>
                          <Col xs={12} md={ 6 }>
                            <OrderBuyForm match={ this.props.match }/>
                          </Col>
                        </Row>
                      </Tab>
                      <Tab eventKey="sell" title="Sell">
                        <Row>
                          <Col xs={12} md={ 6 }>
                            <OrderSellForm match={ this.props.match }/>
                          </Col>
                        </Row>
                      </Tab>
                    </Tabs>
                  </div>
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
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (OrderForm);