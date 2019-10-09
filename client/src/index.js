import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import { createBrowserHistory } from "history";

import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// importing index reducer from store for redux state management
import allReducers from './store';

// importing firebase configuration for authentication purposes
import firebaseConfig from './config/firebase.config';

// declaring configuration for using firebase authentication profile
const rrfConfig = {
  useFirestoreForProfile: true,
  userProfile: 'user', 
};

// declaring and creating store (state management)
const store = createStore(
  allReducers,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebaseConfig),
    reactReduxFirebase(firebaseConfig, rrfConfig)
  )
);

// invoking browser history function to get browser routing history from the web
const history = createBrowserHistory();

ReactDOM.render(
  <CookiesProvider>
    <Router history={history}>
      <Provider store={store}>
          <App />
      </Provider>
    </Router>
  </CookiesProvider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
