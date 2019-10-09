let initialState = {
  email: '',
  password: '',
  errorMessage:  '',
  loadingStatus: false,
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
    default:
      return state;
  }
}

export default authDataList;