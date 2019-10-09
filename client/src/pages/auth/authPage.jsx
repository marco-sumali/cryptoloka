import React, { Component } from 'react';

import Login from '../../components/auth/login';

export default class AuthPage extends Component {
  render() {
    let { path } = this.props.match

    return (
      <div>
        {
          path === '/auth/login' ?
          <Login />
          :
          path === '/auth/register' ?
          <div>register</div>
          :
          <div></div>
        }
      </div>
    )
  }
}
