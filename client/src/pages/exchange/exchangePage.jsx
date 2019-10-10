import React, { Component } from 'react';

import '../../components/exchange/exchange.css';
import OrderBooks from '../../components/exchange/orderBook';
import OrderForms from '../../components/exchange/orderForm';
import { Container, Row, Col} from 'react-bootstrap';

export default class exchangePage extends Component {
  render() {
    return (
      <div className="Exchange-page-box">
        <Container>
          <Row>
            <Col lg={ 12 }>
              <OrderBooks match={ this.props.match }/>
            </Col>
          </Row>
          <Row>
            <Col lg={ 12 }>
              <OrderForms match={ this.props.match }/>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
