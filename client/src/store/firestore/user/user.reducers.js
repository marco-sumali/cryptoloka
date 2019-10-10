let initialState = {
}

const userDataList = (state = { ...initialState }, action) => {
  switch (action.type) {
    case '':
      return ({
        ...state,
        shopsExists: action.payload
      })
    default:
      return state;
  }
}

export default userDataList;