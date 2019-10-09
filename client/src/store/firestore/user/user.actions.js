// PURPOSE: Actions documented in this store section is specialised to manipulate data from/to USER's table

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