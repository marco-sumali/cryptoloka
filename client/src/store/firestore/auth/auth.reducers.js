let initialState = {
  // LOGIN
  email: '',
  password: '',
  errorMessage:  '',
  validationErrorMessages:  [],
  loadingStatus: false,
  hasAuthenticated: true,
  // REGISTER
}

const authDataList = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'SET_AUTH_EMAIL':
      return ({
        ...state,
        email: action.payload
      })
    case 'SET_AUTH_PASSWORD':
      return ({
        ...state,
        password: action.payload
      })
    case 'SET_AUTH_LOADING_STATUS':
      return ({
        ...state,
        loadingStatus: action.payload
      })
    case 'SET_AUTH_ERROR':
      return ({
        ...state,
        errorMessage: action.payload
      })
    case 'SET_AUTH_VALIDATION_ERROR':
      return ({
        ...state,
        validationErrorMessages: action.payload
      })
    case 'SET_HAS_AUTH_STATUS':
      return ({
        ...state,
        hasAuthenticated: action.payload
      })
    default:
      return state;
  }
}

export default authDataList;