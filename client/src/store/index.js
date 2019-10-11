import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

import generalReducer from './general/general.reducers';
import userReducer from './firestore/user/user.reducers';
import authReducer from './firestore/auth/auth.reducers';
import orderReducer from './firestore/order/order.reducers';

const allReducers = combineReducers({
  auth: authReducer,
  user: userReducer,
  order: orderReducer,
  general: generalReducer,
  firebase: firebaseReducer,
});

export default allReducers