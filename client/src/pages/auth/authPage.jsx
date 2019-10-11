import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Redirect } from 'react-router-dom';
import { getUserProfile } from '../../store/firestore/user/user.actions';
import Login from '../../components/auth/login';
import Register from '../../components/auth/register';

class AuthPage extends Component {
  componentDidMount() {
    let { getUserProfile, cookies } = this.props
    getUserProfile(cookies)
  }

  render() {
    let { match, profile } = this.props
    let path = match.path
    return (
      <div>
        {
          profile.email ?
          <Redirect to='/exchange/BTC' />
          :
          <div>
            {
              path === '/auth/login' ?
              <Login />
              :
              path === '/auth/register' ?
              <Register />
              :
              <div></div>
            }
          </div>
        }
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    profile: state.user.profile,
    cookies: state.general.cookies,
    hasAuthenticated: state.auth.hasAuthenticated,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getUserProfile,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (AuthPage);
