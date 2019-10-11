import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Row, Col, Table, Container } from 'react-bootstrap';
import { getOrders } from '../../store/firestore/order/order.actions';
import { formatMoney } from '../../helpers/currency';
import LoadingSvg from '../svg/loading';
import '../../assets/css/bootstrap/component/boot.table.css';

class OrderBook extends Component {
  componentDidMount() {
    let { getOrders, match } = this.props
    getOrders(match.params.coinId)
  }

  render() {
    let { buys, sells, isOrderLoaded } = this.props
    // console.log('from OrderBook', this.props)
    return (
      <div className="Order-box">
        <Row>
          <Col xs={ 12 }>
            <div className="Order-head-box">
              <div className="Order-head-text">Order Book</div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={ 12 }>
            <div className="Order-body-box">
              {
                !isOrderLoaded ?
                <Container>
                  <Row>
                    <Col className="Loading-box Container-nowrap-center" xs={12}>
                      <LoadingSvg width="48px" height="48px" color="#ffffff"/>
                    </Col>
                  </Row>
                </Container>
                :
                <Row>
                  <Col className="Order-sell-box Text-right" xs={12} md={ 6 }>
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
                  <Col className="Order-buy-box Text-right" xs={12}  md={ 6 }>
                    <div className="Web-table-buy-box">
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
                    </div>
                    <div className="Mobile-table-buy-box">
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
                                  <td>{ formatMoney(buyOrder.total) }</td>
                                  <td>{ buyOrder.amount }</td>
                                  <td className="Buy-price-text">{ formatMoney( buyOrder.price ) }</td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </Table>
                    </div>
                  </Col>
                </Row>
              }
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
    isOrderLoaded: state.order.isOrderLoaded,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getOrders,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (OrderBook);

