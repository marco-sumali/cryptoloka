import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../assets/css/bootstrap/component/boot.table.css';
import { Row, Col, Table } from 'react-bootstrap';
import { getOrders } from '../../store/firestore/order/order.actions';
import { formatMoney } from '../../helpers/currency';

class OrderBook extends Component {
  componentDidMount() {
    let { getOrders, match } = this.props
    getOrders(match.params.coinId)
  }

  render() {
    let { buys, sells } = this.props
    console.log('from OrderBook', this.props)
    return (
      <div className="Order-box">
        <Row>
          <Col lg={ 12 }>
            <div className="Order-head-box">
              <div className="Order-head-text">Order Book</div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={ 12 }>
            <div className="Order-body-box">
              <Row>
                <Col lg={ 6 } style={{ paddingRight: '0px' }}>
                  <Table striped hover borderless responsive>
                    <thead>
                      <tr>
                        <th>Total (IDR)</th>
                        <th>Amount</th>
                        <th>Price (IDR)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        sells.map((sellOrder, index) => {
                          return(
                            <tr key={ index }>
                              <td>{ formatMoney(sellOrder.total) }</td>
                              <td>{ sellOrder.amount }</td>
                              <td className="Sell-price-text">{ formatMoney( sellOrder.price ) }</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>
                </Col>
                <Col lg={ 6 } style={{ paddingLeft: '0px' }}>
                <Table striped hover borderless responsive>
                    <thead>
                      <tr>
                        <th>Price (IDR)</th>
                        <th>Amount</th>
                        <th>Total (IDR)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        buys.map((buyOrder, index) => {
                          return(
                            <tr key={ index }>
                              <td className="Buy-price-text">{ formatMoney( buyOrder.price ) }</td>
                              <td>{ buyOrder.amount }</td>
                              <td>{ formatMoney(buyOrder.total) }</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>
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
    buys: state.order.buy,
    sells: state.order.sell,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getOrders,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (OrderBook);

