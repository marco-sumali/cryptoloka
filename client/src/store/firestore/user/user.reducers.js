let initialState = {
}

const userDataList = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'GET_SHOPS_DATA_FAILED':
      return ({
        ...state,
        shopsExists: action.payload
      })
    default:
      return state;
  }
}

export default userDataList;