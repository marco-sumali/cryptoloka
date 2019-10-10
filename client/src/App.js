import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withCookies } from 'react-cookie';

import './App.css';
import './assets/css/general/container.css';
import './assets/css/general/box.css';
import NavBarPage from './pages/navbar/navbarPage';
import NotFoundPage from './pages/navbar/navbarPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            exact path="/auth/login" 
            render={ (props) => (<NavBarPage {...props} cookies={this.props.cookies}/>) } 
          />
          <Route
            exact path="/auth/register" 
            render={ (props) => (<NavBarPage {...props} cookies={this.props.cookies}/>) } 
          />
          <Route
            exact path="/exchange/:coinId" 
            render={ (props) => (<NavBarPage {...props} cookies={this.props.cookies}/>) } 
          />
          <Route path="*" component={ NotFoundPage } />
        </Switch>
      </div>
    );
  }
}

export default withCookies(App);
