let initialState = {
  profile: ''
}

const userDataList = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'SET_USER_PROFILE':
      return ({
        ...state,
        profile: action.payload
      })
    default:
      return state;
  }
}

export default userDataList;