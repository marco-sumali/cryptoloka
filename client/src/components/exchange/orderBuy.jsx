import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { 
  handleChangesBuyingOrder, 
  createBuyOrderConfirmation, 
  handleBuyModalShow,
  createBuyOrder
} from '../../store/firestore/order/order.actions';
import { getUserProfile } from '../../store/firestore/user/user.actions';
import { formatMoney } from '../../helpers/currency';

class OrderBuyForm extends Component {
  render() {
    let { 
      handleChangesBuyingOrder,
      buyPrice,
      buyTotal,
      buyAmount,
      buyFee,
      buyNetAmount,
      createBuyOrderConfirmation,
      profile,
      match,
      buyModalShow,
      handleBuyModalShow,
      createBuyOrder
    } = this.props
    let coinId = match.params.coinId
    // console.log('from BuyOrderForm', this.props)
    return (
      <Form onSubmit={ (e) => createBuyOrderConfirmation(e, buyNetAmount) }>
        <Row>
          <Col xs={ 12 }>
            <Form.Group controlId="buyTotal">
              <Form.Label className="Order-input-label">Total (IDR)</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="" 
                value={ buyTotal }
                onChange={ (e) => handleChangesBuyingOrder(e, document) }
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
                onChange={ (e) => handleChangesBuyingOrder(e, document) }
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

        <Modal show={ buyModalShow } onHide={ () => handleBuyModalShow(buyModalShow) }>
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
        </Modal>
        
        <Button variant="secondary" type="submit" style={{ width: '100%' }}>
          BUY
        </Button>
      </Form>
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
    profile: state.user.profile,
    cookies: state.general.cookies,
    buyModalShow: state.order.buyModalShow,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  handleChangesBuyingOrder,
  getUserProfile,
  createBuyOrderConfirmation,
  handleBuyModalShow,
  createBuyOrder,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (OrderBuyForm);

