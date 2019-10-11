// PURPOSE: Functions documented in this helpers section is specialised for Authentication purposes

// -------------------------------------------------------------- COOKIES RELATED --------------------------------------------------------------
const jwt = require('jsonwebtoken');

// VARIABLE INFORMATION
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

// -------------------------------------------------------------- FORM RELATED --------------------------------------------------------------
// To validate email format based on required standard
function validateEmail(email) {
  var pattern = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(email);
}

// To validate password can't contain exact word 'password'
function validateExactPassword(password) {
  let restrictedPassword = /password/i
  let test = restrictedPassword.test(password)
  let result = true
  if (test) {
    result = false
  }
  return result 
}

// To validate password can't contain variation of numbers to replace alphabets of 'password'
function validateExactVariationPassword (password) {
  // Based on requirement the password can't contain any variations of numbers and alphabets from the word 'password' => 'p455w012d'
  // Thought Process:
  // 1. Find all indexes for 'p' and 'd': No matter the variations, the beginning and the end always start with 'p' and end with 'd'. 
  // If this process return indexes more than -1, then continue. Revise the password to lower case string to avoid sensitive case.
  // 2. Variance between index of 'p' and 'd' must be between 7 (8 characters: 'password') and 8 (9 characters: 'p455w012d' ) 
  // considering 'r' can be replaced with '12'. If this process validated, then continue.
  // 3. Splice the word between validated indexes of 'p' and 'd'.
  // 4. Perform looping validation to check each characters of validated words to restricted words ('password' and 'p455w012d') 
  // starting from index 1 and index length -1 because no need to check first and last index which should be 'p' and 'd', respectively. 
  // If it matches with restricted words then add 1 to restrictedScore variables which we use to identify score of identified restricted characters in the word to check.
  // 4a. However if the word to check is 9 characters then check whether the 7th and 8th character is '12' 
  // which represent 'r'. And plus the index in the looping to avoid to check the 8th character twice.
  // 5. Check the restrictedScore which should be equal to 6 that represent 6 characters matched to restricted word 
  // excluding 'p' and 'd'. If it has 6 score then return false as a result shows that the password that we check did contain 'password'.

  // STEP 1
  let word = password.toLowerCase()
  let indexesOfP = []
  let indexesofD = []

  for (let i = 0; i < word.length ; i++) {
    if (word[i] === 'p') {
      indexesOfP.push(i)
    } else if (word[i] === 'd') {
      indexesofD.push(i)
    }
  } 
  // console.log('----step1', indexesOfP, indexesofD)

  // STEP 2
  let validatedIndexes = []
  for (let i = 0; i < indexesofD.length; i++) {
    for (let j = 0; j < indexesOfP.length; j++) {
      // console.log('--check', i, j, indexesofD[i], indexesOfP[j])
      if (indexesofD[i] - indexesOfP[j] === 7 || indexesofD[i] - indexesOfP[j] === 8) {
        validatedIndexes.push([indexesOfP[j], indexesofD[i]]) 
      }
    }
  }
  // console.log('----step2', validatedIndexes)

  // STEP 3
  let subPasswordToCheck = []
  for (let i = 0; i < validatedIndexes.length; i++) {
    let wordToCheck = word.slice(validatedIndexes[i][0], validatedIndexes[i][1]+1)
    subPasswordToCheck.push(wordToCheck)
  }
  // console.log('----step3', subPasswordToCheck)

  // STEP 4b
  let restrictedPassword1 = ['p','a','s','s','w','o','r','d']
  let restrictedPassword2 = ['p','4','5','5','w','0','12','d']
  let restrictedResult = []
  for (let i = 0; i < subPasswordToCheck.length; i++) {
    let wordsToCheck = subPasswordToCheck[i].split('')
    let restrictedScore = 0
    for (let j = 1; j < wordsToCheck.length-1; j++) {      
      if (wordsToCheck.length === 9 && j === 6) {
        if (subPasswordToCheck[i].slice(6, 8) === restrictedPassword2[6]) {
          restrictedScore++
          j++
        }
      } else {
        if (wordsToCheck[j] === restrictedPassword1[j] || wordsToCheck[j] === restrictedPassword2[j]) {
          restrictedScore++
        }
      }
    }
    restrictedResult.push(restrictedScore)
  }
  // console.log('----step4', restrictedResult)

  // STEP 5
  let finalResult = true
  if (restrictedResult.indexOf(6) > -1) {
    finalResult = false
  }

  return finalResult
}


module.exports = {
  getAndVerifyCookies,
  setNewCookies,
  removeCookies,
  validateEmail,
  validateExactPassword,
  validateExactVariationPassword,
}
