// PURPOSE: Actions documented in this store section is specialised to manipulate data from/to USER's table

import { getAndVerifyCookies } from '../../../helpers/auth';

// To get user data from database
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

export const getUserProfile = (cookies) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    
    let CUID = await getAndVerifyCookies(cookies)
    // console.log('hello', CUID)
    let userProfile = await dispatch(getUser(CUID.id))
    await dispatch(setUserProfile(userProfile))
  }
}

const setUserProfile = (data) => {
  return {
    type: 'SET_USER_PROFILE',
    payload: data
  }
}
