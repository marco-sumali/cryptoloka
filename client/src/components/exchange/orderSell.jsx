import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Row, Col, Form, Button, Modal } from 'react-bootstrap';
import {
  handleChangesSellingOrder,
  createSellOrderConfirmation,
  handleSellModalShow,
  createSellOrder,
} from '../../store/firestore/order/order.actions';
import { formatMoney } from '../../helpers/currency';
import LoadingSvg from '../svg/loading';

class OrderSellForm extends Component {
  render() {
    let {
      match,
      profile,
      sellAmount,
      sellPrice,
      sellTotal,
      sellFee,
      sellNetAmount,
      loadingStatus,
      sellModalShow,
      handleChangesSellingOrder,
      createSellOrderConfirmation,
      handleSellModalShow,
      createSellOrder,
    } = this.props
    let coinId = match.params.coinId
    // console.log('from SellOrderForm', this.props)
    return (
      <Form onSubmit={ loadingStatus === false ? (e) => createSellOrderConfirmation(e, sellNetAmount) : null }>
        <Row>
          <Col xs={ 12 }>
            <Form.Group controlId="sellAmount">
              <Form.Label className="Order-input-label">Amount ({ coinId })</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="" 
                value={ sellAmount }
                onChange={ (e) => handleChangesSellingOrder(e, document) }
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={ 12 }>
            <Form.Group controlId="sellPrice">
              <Form.Label className="Order-input-label">Price (IDR)</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="" 
                value={ sellPrice }
                onChange={ (e) => handleChangesSellingOrder(e, document) }
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={ 7 }>
            <div className="Order-input-text" style={{ fontWeight: 'bold' }}>Total</div>
          </Col>
          <Col xs={ 5 }>
            <div className="Order-input-text" style={{ fontWeight: 'bold', textAlign: 'right' }}>{ formatMoney(sellTotal) } IDR</div>
          </Col>
        </Row>
        <Row>
          <Col xs={ 7 }>
            <div className="Order-input-text">Fee (Maker 0.15% - Taker 0.15%)</div>
          </Col>
          <Col xs={ 5 }>
            <div className="Order-input-text" style={{ textAlign: 'right' }}>{ formatMoney(sellFee) } IDR</div>
          </Col>
        </Row>
        <Row>
          <Col xs={ 7 }>
            <div className="Order-input-text">Net Selling Amount</div>
          </Col>
          <Col xs={ 5 }>
            <div className="Order-input-text" style={{ textAlign: 'right' }}>{ formatMoney(sellNetAmount) } IDR</div>
          </Col>
        </Row>

        <Modal show={ sellModalShow } onHide={ () => handleSellModalShow(sellModalShow) }>
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
                <div>Amount (BTC)</div>
              </Col>
              <Col lg={1}>
                <div>:</div>
              </Col>
              <Col lg={7}>
                <div className="Text-right">{ sellAmount } { coinId }</div>
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
                <div className="Text-right">{ formatMoney(sellPrice) } IDR</div>
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
                <div className="Text-right">{ formatMoney(sellTotal) } IDR</div>
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
                <div className="Text-right">{ formatMoney(sellFee) } IDR</div>
              </Col>
            </Row>
            <Row>
              <Col lg={4}>
                <div>Net Selling Amount</div>
              </Col>
              <Col lg={1}>
                <div>:</div>
              </Col>
              <Col lg={7}>
                <div className="Text-right">{ formatMoney(sellNetAmount) } IDR</div>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button style={{ width: '5em' }}  variant="light" onClick={ () => handleSellModalShow(sellModalShow) }>
              Cancel
            </Button>
            <Button style={{ width: '5em' }} variant="secondary" onClick={ (e) => { handleSellModalShow(sellModalShow); createSellOrder(e, profile, coinId, sellTotal, sellPrice, sellAmount, sellFee, sellNetAmount)} }>
              Sell
            </Button>
          </Modal.Footer>
        </Modal>
        
        <Button 
          variant="info" 
          disabled={ loadingStatus }
          type="submit" 
          style={{ width: '100%' }}
        >
          {
            !loadingStatus ? 
            <div>SELL</div> 
            : 
            <div className="Container-nowrap-center">
              <LoadingSvg height="24px" width="24px" color="#ffffff" />
              <div>SELL</div>
            </div>  
          }
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
    loadingStatus: state.order.sellLoadingStatus,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  handleChangesSellingOrder,
  createSellOrderConfirmation,
  handleSellModalShow,
  createSellOrder,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (OrderSellForm);
