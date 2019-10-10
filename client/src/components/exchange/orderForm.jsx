import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Row, Col, Form, Button } from 'react-bootstrap';
import { handleChangesBuyingOrder } from '../../store/firestore/order/order.actions';

class OrderForm extends Component {
  render() {
    let { 
      handleChangesBuyingOrder,
      buyPrice,
      buyTotal,
      buyAmount,
      buyFee,
      buyNetAmount
    } = this.props
    // console.log('from OrderForm', this.props)
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
                  <Form>
                    <Row>
                      <Col xs={ 12 }>
                        <Form.Group controlId="buyTotal">
                          <Form.Label className="Order-input-label">Total (IDR)</Form.Label>
                          <Form.Control 
                            type="number" 
                            placeholder="" 
                            value={ buyTotal }
                            onChange={ (e) => handleChangesBuyingOrder(e, Number(buyTotal), Number(buyPrice)) }
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={ 12 }>
                        <Form.Group controlId="buyPrice">
                          <Form.Label className="Order-input-label">Price (IDR)</Form.Label>
                          <Form.Control 
                            type="number" 
                            placeholder="" 
                            value={ buyPrice }
                            onChange={ (e) => handleChangesBuyingOrder(e, Number(buyTotal), Number(buyPrice)) }
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={ 7 }>
                        <div className="Order-input-text" style={{ fontWeight: 'bold' }}>Estimated Amount</div>
                      </Col>
                      <Col xs={ 5 }>
                        <div className="Order-input-text" style={{ fontWeight: 'bold', textAlign: 'right' }}>{ buyAmount } BTC</div>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={ 7 }>
                        <div className="Order-input-text">Fee (Maker 0.15% - Taker 0.15%)</div>
                      </Col>
                      <Col xs={ 5 }>
                        <div className="Order-input-text" style={{ textAlign: 'right' }}>{ buyFee } BTC</div>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={ 7 }>
                        <div className="Order-input-text">Net Buying Amount</div>
                      </Col>
                      <Col xs={ 5 }>
                        <div className="Order-input-text" style={{ textAlign: 'right' }}>{ buyNetAmount } BTC</div>
                      </Col>
                    </Row>
                    
                    <Button variant="secondary" type="submit" style={{ width: '100%' }}>
                      BUY
                    </Button>
                  </Form>

                </Col>
                <Col lg={ 6 }>
                  Sell
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
    buyTotal: state.order.buyTotal,
    buyPrice: state.order.buyPrice,
    buyAmount: state.order.buyAmount,
    buyFee: state.order.buyFee,
    buyNetAmount: state.order.buyNetAmount,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  handleChangesBuyingOrder,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (OrderForm);

