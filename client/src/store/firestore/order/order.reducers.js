let initialState = {
  buy: [],
  sell: [],
  buyTotal: 0,
  buyPrice: 0,
  buyAmount: 0,
  buyFee: 0,
  buyNetAmount: 0,
}

const userDataList = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'SET_BUY_ORDERS':
      return ({
        ...state,
        buy: action.payload
      })
    case 'SET_SELL_ORDERS':
      return ({
        ...state,
        sell: action.payload
      })
    case 'SET_BUY_TOTAL':
      return ({
        ...state,
        buyTotal: action.payload
      })
    case 'SET_BUY_PRICE':
      return ({
        ...state,
        buyPrice: action.payload
      })
    case 'SET_BUY_AMOUNT':
      return ({
        ...state,
        buyAmount: action.payload
      })
    case 'SET_BUY_FEE':
      return ({
        ...state,
        buyFee: action.payload
      })
    case 'SET_BUY_NET_AMOUNT':
      return ({
        ...state,
        buyNetAmount: action.payload
      })
    default:
      return state;
  }
}

export default userDataList;