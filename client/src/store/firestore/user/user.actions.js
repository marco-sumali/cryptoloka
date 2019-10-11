// PURPOSE: Actions documented in this store section is specialised to manipulate data from/to USER's table

import { getAndVerifyCookies } from '../../../helpers/auth';
import { setHasAuthStatus } from '../auth/auth.actions';

// To get user data from database
// Ideally used for authentication purposes
// If user is not found on the database then return false status
// which to be followed for redirection to certain page.
export const getUser = (uid) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let usersRef = firestore.collection('users').doc(uid)
    let user = false

    await usersRef.get()
    .then(doc => {
      if (doc.exists) {
        let id = doc.id
        let { email } = doc.data()
        user = { id, email }
      }
    })
    .catch(err => {
      console.log('ERROR: Get User')
    })

    return user
  }
}

// To verify authentication on cookies and database and to return user profile
// Basically used to save user data to store and update authentication status to true (which mean user has been authenticated)
export const getUserProfile = (cookies) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let CUID = await getAndVerifyCookies(cookies)

    if (CUID.id) {
      let userProfile = await dispatch(getUser(CUID.id))
      await dispatch(setUserProfile(userProfile))
    } else {
      await dispatch(setHasAuthStatus(false))
    }
  }
}

// Reducer: to update user profile to store
const setUserProfile = (data) => {
  return {
    type: 'SET_USER_PROFILE',
    payload: data
  }
}

// To create new user to database
export const createNewUser = (uid, email) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore =  getFirestore()
    let usersRef = firestore.collection('users').doc(uid)
    let createdUser = false

    let newUser = {
      email,
      createdDate: new Date(Date.now()),
      updatedDate: new Date(Date.now())
    }

    await usersRef.set(newUser)
    .then(() => {
      createdUser = {
        id: uid,
        email,
      }
    })
    .catch(err => {
      console.log('ERROR: Create New User', err)
    })

    return createdUser
  }
}
