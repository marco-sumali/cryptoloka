// PURPOSE: Actions documented in this store section is specialised for Firebase Authentication

import { getUser } from '../user/user.actions';
import { setNewCookies } from '../../../helpers/auth';

// Information Declaration
export const loginError = 'The email or password you entered is incorrect.'
export const tooManyRequestError = 'Too many unsuccessful authorisation attempts. Try again later.'
export const loginDisableError = `Your account has been disabled. Please contact our support team.`

// To handle store changes in form input during authentication
export const handleChangesAuth = (e) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let target = e.target
    let inputId = target.id
    let value = target.value

    if (inputId === 'email') {
      dispatch(setEmailAuthInput(value))
    } else if (inputId === 'password') {
      dispatch(setPasswordAuthInput(value))
    }
  }
}

// Reducer: to set email auth input
const setEmailAuthInput = (data) => {
  return {
    type: 'SET_AUTH_EMAIL',
    payload: data
  }
}

// Reducer: to set password auth input
const setPasswordAuthInput = (data) => {
  return {
    type: 'SET_AUTH_PASSWORD',
    payload: data
  }
}

// To authenticate user request to signed in
// Authentication Process
// 1. Form Validation
//    a. Email should contain a valid address
//    b. Password must be 8 characters long
//    a. Password should not contain variation of word from 'password'
// 2. Get authentication status using firebase auth
// 3. If user's authentication process approved, continue. Otherwise, send error message
// 4. Check authenticated user from firebase auth to our Firestore database
// 5. If user is exist in Firestore, give user authorisation status (if necessary)
// The idea to validate to database it to ensure that user is not just authenticated but also authorised
// Otherwise, send error message
export const authSignIn = (e, email, password, cookies, windows) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    e.preventDefault()
    dispatch(setLoadingStatus(true))

    // AUTH VALIDATION
    // IF SUCCESS
    let firebase = getFirebase()
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(async (response) => {
      let uid = response.user.uid
      let user = await dispatch(getUser(uid))      
      if (user.id) {
        dispatch(setAuthError(""))
        setNewCookies(cookies, user)
        window.location.assign('/exchange')
      } else {
        // Not properly authorised
      }
    })
    .catch(err => {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-email') {
        dispatch(setAuthError(loginError))
        dispatch(setLoadingStatus(false))
      } else if (err.code === 'auth/user-disabled') {
        dispatch(setAuthError(loginDisableError))
        dispatch(setLoadingStatus(false))
      } else if (err.code === 'auth/too-many-requests') {
        dispatch(setAuthError(tooManyRequestError))
        dispatch(setLoadingStatus(false))
      }
    })
  }
}

// Reducer: To set Login Error Message
export const setAuthError = (data) => {
  return {
    type: 'SET_AUTH_ERROR',
    payload: data
  }
}

// Reducer: To set loading status during user authentication
export const setLoadingStatus = (data) => {
  return {
    type: 'SET_AUTH_LOADING_STATUS',
    payload: data
  }
}
