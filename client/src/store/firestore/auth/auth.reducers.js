let initialState = {
  hasAuthenticated: true,
  // LOGIN
  email: '',
  password: '',
  errorMessage:  '',
  validationErrorMessages:  [],
  loadingStatus: false,
  // REGISTER
  regEmail: '',
  regPassword: '',
  regErrorMessage:  '',
  regValidationErrorMessages:  [],
  regLoadingStatus: false,
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
    case 'SET_REG_EMAIL':
      return ({
        ...state,
        regEmail: action.payload
      })
    case 'SET_REG_PASSWORD':
      return ({
        ...state,
        regPassword: action.payload
      })
    case 'SET_REG_ERROR':
      return ({
        ...state,
        regErrorMessage: action.payload
      })
    case 'SET_REG_LOADING_STATUS':
      return ({
        ...state,
        regLoadingStatus: action.payload
      })
    case 'SET_REG_VALIDATION_ERROR':
      return ({
        ...state,
        regValidationErrorMessages: action.payload
      })

    default:
      return state;
  }
}

export default authDataList;