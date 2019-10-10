import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Row, Col, Form, Button, Modal } from 'react-bootstrap';

class OrderSellForm extends Component {
  render() {
    let {
      match,
      sellAmount,
      sellPrice,
      sellTotal,
      sellFee,
      sellNetAmount,
    } = this.props
    let coinId = match.params.coinId
    // console.log('from SellOrderForm', this.props)
    return (
      <Form >
        <Row>
          <Col xs={ 12 }>
            <Form.Group controlId="buyTotal">
              <Form.Label className="Order-input-label">Amount ({ coinId })</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="" 
                value={ sellAmount }
                // onChange={ (e) => handleChangesBuyingOrder(e, document) }
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
                value={ sellPrice }
                // onChange={ (e) => handleChangesBuyingOrder(e, document) }
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={ 7 }>
            <div className="Order-input-text" style={{ fontWeight: 'bold' }}>Total</div>
          </Col>
          <Col xs={ 5 }>
            <div className="Order-input-text" style={{ fontWeight: 'bold', textAlign: 'right' }}>{ 0 } IDR</div>
          </Col>
        </Row>
        <Row>
          <Col xs={ 7 }>
            <div className="Order-input-text">Fee (Maker 0.15% - Taker 0.15%)</div>
          </Col>
          <Col xs={ 5 }>
            <div className="Order-input-text" style={{ textAlign: 'right' }}>{ 0 } IDR</div>
          </Col>
        </Row>
        <Row>
          <Col xs={ 7 }>
            <div className="Order-input-text">Net Selling Amount</div>
          </Col>
          <Col xs={ 5 }>
            <div className="Order-input-text" style={{ textAlign: 'right' }}>{ 0 } IDR</div>
          </Col>
        </Row>

        {/* <Modal show={ buyModalShow } onHide={ () => handleBuyModalShow(buyModalShow) }>
          <Modal.Header closeButton>
            <Modal.Title>Order Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body className="Modal-text">
          <Row>
              <Col lg={4}>
                <div>User</div>
              </Col>
              <Col lg={1}>
                <div>:</div>
              </Col>
              <Col lg={7}>
                <div className="Text-right">{ profile.email }</div>
              </Col>
            </Row>
            <Row>
              <Col lg={4}>
                <div>Total (IDR)</div>
              </Col>
              <Col lg={1}>
                <div>:</div>
              </Col>
              <Col lg={7}>
                <div className="Text-right">{ formatMoney(buyTotal) }</div>
              </Col>
            </Row>
            <Row>
              <Col lg={4}>
                <div>Price (IDR)</div>
              </Col>
              <Col lg={1}>
                <div>:</div>
              </Col>
              <Col lg={7}>
                <div className="Text-right">{ formatMoney(buyPrice) }</div>
              </Col>
            </Row>
            <Row>
              <Col lg={4}>
                <div>Estimated Amount</div>
              </Col>
              <Col lg={1}>
                <div>:</div>
              </Col>
              <Col lg={7}>
                <div className="Text-right">{ buyAmount } { coinId }</div>
              </Col>
            </Row>
            <Row>
              <Col lg={4}>
                <div>Fee (0.15%)</div>
              </Col>
              <Col lg={1}>
                <div>:</div>
              </Col>
              <Col lg={7}>
                <div className="Text-right">{ buyFee } { coinId }</div>
              </Col>
            </Row>
            <Row>
              <Col lg={4}>
                <div>Net Buying Amount</div>
              </Col>
              <Col lg={1}>
                <div>:</div>
              </Col>
              <Col lg={7}>
                <div className="Text-right">{ buyNetAmount } { coinId }</div>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button style={{ width: '5em' }}  variant="light" onClick={ () => handleBuyModalShow(buyModalShow) }>
              Cancel
            </Button>
            <Button style={{ width: '5em' }} variant="secondary" onClick={ (e) => { handleBuyModalShow(buyModalShow); createBuyOrder(e, profile, coinId, buyTotal, buyPrice, buyAmount, buyFee, buyNetAmount)} }>
              Buy
            </Button>
          </Modal.Footer>
        </Modal> */}
        
        <Button variant="info" type="submit" style={{ width: '100%' }}>
          SELL
        </Button>
      </Form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile,
    cookies: state.general.cookies,
    sellTotal: state.order.sellTotal,
    sellPrice: state.order.sellPrice,
    sellAmount: state.order.sellAmount,
    sellFee: state.order.sellFee,
    sellNetAmount: state.order.sellNetAmount,
    sellModalShow: state.order.sellModalShow,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (OrderSellForm);
