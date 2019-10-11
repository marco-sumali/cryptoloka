import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AuthPage from '../auth/authPage';
import ExchangePage from '../exchange/exchangePage';
import NotFoundPage from '../error/notFoundPage';
import Navbar from '../../components/navbar/navbar';
import { setCookiesFunction } from '../../store/general/general.actions';
import { Redirect } from 'react-router-dom';

class NavbarPage extends Component {
  render() {
    let { match, cookies, setCookiesFunction } = this.props
    let path = match.path
    setCookiesFunction(cookies)
    // console.log('from NavbarPage', this.props)
    return (
      <div>
        <Navbar />
        {
          path === '/' ?
          <Redirect to='/auth/login' />
          :
          path === '/auth/login' ?
          <AuthPage match={ this.props.match } />
          :
          path === '/auth/register' ?
          <AuthPage match={ this.props.match } />
          :
          path === '/exchange/:coinId' ?
          <ExchangePage match={ this.props.match } />
          :
          <NotFoundPage />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setCookiesFunction
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (NavbarPage);

