// PURPOSE: Functions documented in this helpers section is specialised for Authentication purposes

const jwt = require('jsonwebtoken');

// Declaring default variables for creating a token to be stored/get for cookies
// Private key is store on env file to be secured
const PRIVATEKEY = process.env.REACT_APP_PRIVATEKEY
// Path is set to '/' so it can accessed from all pages
const pathDefault = '/'
// Secure is set to false considering that it is still development stage so we might need to develop in HTTP environment
const secureDefaultStatus = false
// Declaring a default expiration date information for storing cookies
// Considering there is no specific security requirement, we set the default cookies expiration date for a single auth is 1 year from each sign in
// The purpose for very long period of expiration is to make ease of user experience when they want to do exchange
// Further considering that the Project will use Cold Storage to store the exchange data so it is secured
let todayFullDate = new Date(Date.now())
let todayYear = todayFullDate.getFullYear()
let todayDate = todayFullDate.getDate()
let todayMonth = todayFullDate.getMonth() + 1
let expirationYear = Number(todayYear) + 1
let expirationDate = new Date(expirationYear, todayMonth, todayDate)

// To get cookies and verify them
function getAndVerifyCookies(cookies) {
  // CUID stands for Cryptoloka User ID
  // Default return set to false to ensure that only authenticated person can access the exchange page
  let decodedCUID = false
  
  // Get CUID cookies and then verify them if they are exist
  // Otherwise return a false status
  // Because we are going to set an authentication status based on return data from this function
  // If it sets to false, it means that the person is not yet properly authenticated
  let CUID = cookies.get('CUID')
  if (CUID) {
    decodedCUID = jwt.verify(CUID, PRIVATEKEY)
  }

  return decodedCUID
}

// To crate a new JWT token for our user authentication cookies
function setNewCookies(cookies, userData) {
  let CUID = jwt.sign(userData, PRIVATEKEY)
  cookies.set('CUID', CUID, { path: pathDefault, secure: secureDefaultStatus, expires: expirationDate })
}


// To remove authentication cookies from web storage
function removeCookies(cookies) {
  cookies.remove('CUID',  { path: pathDefault, secure: secureDefaultStatus, expires: expirationDate })
}


module.exports = {
  getAndVerifyCookies,
  setNewCookies,
  removeCookies
}
