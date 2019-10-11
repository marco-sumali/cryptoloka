let initialState = {
  buy: [],
  sell: [],
  buyTotal: 0,
  buyPrice: 0,
  buyAmount: 0,
  buyFee: 0,
  buyNetAmount: 0,
  buyModalShow: false,
  buyLoadingStatus: false,
  sellAmount: 0,
  sellPrice: 0,
  sellTotal: 0,
  sellFee: 0,
  sellNetAmount: 0,
  sellModalShow: false,
  sellLoadingStatus: false,
  isOrderLoaded: false,
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
    case 'SET_BUY_MODAL_SHOW':
      return ({
        ...state,
        buyModalShow: action.payload
      })
    case 'SET_BUY_LOADING_STATUS':
      return ({
        ...state,
        buyLoadingStatus: action.payload
      })
    case 'SET_SELL_TOTAL':
      return ({
        ...state,
        sellTotal: action.payload
      })
    case 'SET_SELL_PRICE':
      return ({
        ...state,
        sellPrice: action.payload
      })
    case 'SET_SELL_AMOUNT':
      return ({
        ...state,
        sellAmount: action.payload
      })
    case 'SET_SELL_FEE':
      return ({
        ...state,
        sellFee: action.payload
      })
    case 'SET_SELL_NET_AMOUNT':
      return ({
        ...state,
        sellNetAmount: action.payload
      })
    case 'SET_SELL_MODAL_SHOW':
      return ({
        ...state,
        sellModalShow: action.payload
      })
    case 'SET_SELL_LOADING_STATUS':
      return ({
        ...state,
        sellLoadingStatus: action.payload
      })
    case 'SET_GET_ORDER_LOADING_STATUS':
      return ({
        ...state,
        isOrderLoaded: action.payload
      })
    default:
      return state;
  }
}

export default userDataList;