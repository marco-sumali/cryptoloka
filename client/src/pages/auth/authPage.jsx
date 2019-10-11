import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Login from '../../components/auth/login';
import { getUserProfile } from '../../store/firestore/user/user.actions';
import { Redirect } from 'react-router-dom';

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
              <div>register</div>
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
