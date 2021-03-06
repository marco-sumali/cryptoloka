// PURPOSE: Actions documented in this store section is specialised for Firebase Authentication

import { getUser, createNewUser } from '../user/user.actions';
import { 
  setNewCookies, 
  validateEmail, 
  validateExactPassword, 
  validateExactVariationPassword,
  removeCookies,
} from '../../../helpers/auth';

// Variable Declaration
export const loginError = 'The email or password you entered is incorrect.'
export const emailFormatError = 'Email format is incorrect.'
export const minPasswordError = 'Min. password length is 8 characters.'
export const containPasswordError = `Password can't contain the word 'password' or any number variations replacing each character.`
export const tooManyRequestError = 'Too many unsuccessful authorisation attempts. Try again later.'
export const loginDisableError = `Your account has been disabled. Please contact our support team.`
export const emailRegisteredError = 'Email is already registered.'

// ------------------------------------------------ LOGIN ------------------------------------------------
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
// Authentication Process:
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
// 6. If validated, remove error message, create new cookies and redirect user to exchange page
export const authSignIn = (e, email, password, cookies, window) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    e.preventDefault()
    dispatch(setLoadingStatus(true))

    // AUTH VALIDATION
    let validationStatus = dispatch(authValidation(email, password, 'login'))

    if (validationStatus) {
      // IF SUCCESS
      let firebase = getFirebase()
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(async (response) => {
        let uid = response.user.uid
        let user = await dispatch(getUser(uid))      
        if (user.id) {
          // Remove error messages
          dispatch(setAuthError(""))
          // Create new cookies
          setNewCookies(cookies, user)
          // Redirect user to exchange page
          window.location.assign('/exchange/BTC')
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
    } else {
      // IF FAILURE
      // Send error message which has been send during validation.
      // Remove loading status
      dispatch(setLoadingStatus(false))
    }
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

// To validate user input during authentication process
// It should return true or false statement
// True means that password meets the requirement and false means that it does not meet the requirement
// Requirement:
// 1. Form Validation
//    a. Email should contain a valid address
//    b. Password must be 8 characters long
//    a. Password should not contain variation of word from 'password'
export const authValidation = (email, password, whichAuth) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let emailValidationStatus = false
    let passwordValidationStatus = false
    let errors = []

    // ERROR VALIDATION - update error messages if error is identified
    // Email Format Validation: false means error format
    if (!validateEmail(email)) {
      errors.push(emailFormatError)
    }
    // Password Length Validation: minimum is 8 characters
    if (password.length < 8) {
      errors.push(minPasswordError)
    }
    // Password Variation Validation: it can't contain the word 'password' or any other number character replacements.
    if (!validateExactPassword(password) || !validateExactVariationPassword(password)) {
      errors.push(containPasswordError)
    }

    // Send the error messages to store
    if (whichAuth === 'login') {
      dispatch(setAuthValidationError(errors))
    } else if (whichAuth === 'register') {
      dispatch(setRegisterValidationError(errors))
    }
    
    // APPROVED VALIDATION - update status for both email and password to true if it passed the validation
    if (validateEmail(email)) {
      emailValidationStatus = true
    }

    if (password.length >= 8 && validateExactPassword(password) && validateExactVariationPassword(password)) {
      passwordValidationStatus = true
    }

    // Remove error messages if validation is successful
    if (emailValidationStatus && passwordValidationStatus) {
      dispatch(setAuthValidationError([]))
    }

    return emailValidationStatus && passwordValidationStatus
  }
}

// Reducer: To set Login Validation Error Message
export const setAuthValidationError = (data) => {
  return {
    type: 'SET_AUTH_VALIDATION_ERROR',
    payload: data
  }
}

// Reducer: To set Register Validation Error Message
export const setRegisterValidationError = (data) => {
  return {
    type: 'SET_REG_VALIDATION_ERROR',
    payload: data
  }
}

// Reducer: To set authentication status whether the user has been authenticated or not
// The default value is true. When validation failed, set auth status to false and redirect the user to login.
export const setHasAuthStatus = (data) => {
  return {
    type: 'SET_HAS_AUTH_STATUS',
    payload: data
  }
}

// To sign out user and remove authentication cookies from web
export const authSignOut = (cookies) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // Remove auth cookies
    removeCookies(cookies)
    // Redirect to login page
    window.location.assign('/auth/login')
  }
}

// ------------------------------------------------ REGISTER ------------------------------------------------
// To handle store changes in form input during registration
export const handleChangesRegister = (e) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let target = e.target
    let inputId = target.id
    let value = target.value

    if (inputId === 'regEmail') {
      dispatch(setEmailRegisterInput(value))
    } else if (inputId === 'regPassword') {
      dispatch(setPasswordRegisterInput(value))
    }
  }
}

// Reducer: to set email register input
const setEmailRegisterInput = (data) => {
  return {
    type: 'SET_REG_EMAIL',
    payload: data
  }
}

// Reducer: to set password register input
const setPasswordRegisterInput = (data) => {
  return {
    type: 'SET_REG_PASSWORD',
    payload: data
  }
}

// To authenticate user request to register
// Authentication Process:
// 1. Form Validation
//    a. Email should contain a valid address
//    b. Password must be 8 characters long
//    a. Password should not contain variation of word from 'password'
// Send error message if validation return negative result
// 2. Register user to firebase authentication to get reference ID to be set to database
// 3. If validated, remove error message, create new user, create new cookies and redirect user to exchange page
export const authRegister = (e, email, password, cookies) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    e.preventDefault()
    dispatch(setRegisterLoadingStatus(true))

    // AUTH VALIDATION
    let validationStatus = dispatch(authValidation(email, password, 'register'))

    if (validationStatus) {
      // IF SUCCESS
      let firebase = getFirebase()
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(async (response) => {
        let uid = response.user.uid

        // Create new user to database
        let createdUser = await dispatch(createNewUser(uid, email))      
        if (createdUser.id) {
          // Create new cookies
          setNewCookies(cookies, createdUser)
          // Redirect user to exchange page
          window.location.assign('/exchange/BTC')
        } else {
          // Not properly authorised
        }
      })
      .catch(err => {
        if (err.code === 'auth/email-already-in-use') {
          dispatch(setRegisterError(emailRegisteredError))
          dispatch(setRegisterLoadingStatus(false))
        } else if (err.code === 'auth/invalid-email' || err.code === 'auth/operation-not-allowed') {
          dispatch(setRegisterError(emailFormatError))
          dispatch(setRegisterLoadingStatus(false))
        } else if (err.code === 'auth/weak-password') {
          dispatch(setRegisterError(minPasswordError))
          dispatch(setRegisterLoadingStatus(false))
        }
      })
    } else {
      // IF FAILURE
      // Send error message which has been send during validation.
      // Remove loading status
      dispatch(setRegisterLoadingStatus(false))
    }
  }
}

// Reducer: To set Register Error Message
export const setRegisterError = (data) => {
  return {
    type: 'SET_REG_ERROR',
    payload: data
  }
}

// Reducer: To set loading status during user registration
export const setRegisterLoadingStatus = (data) => {
  return {
    type: 'SET_REG_LOADING_STATUS',
    payload: data
  }
}