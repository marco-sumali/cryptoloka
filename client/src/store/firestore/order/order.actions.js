// PURPOSE: Actions documented in this store section is specialised to manipulate data from/to ORDERS's table

// To get orders data from database
// Both buy and sell data
export const getOrders = (coinId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let ordersRef = firestore.collection('orderBooks')
    let buyOrders = []
    let sellOrders = []

    ordersRef
    .where('coinId', '==', coinId)
    .get()
    .then(snapshot => {
      if (snapshot.empty === false) {
        snapshot.forEach(doc => {
          let id = doc.id
          let data = doc.data()
          let order = { id, ...data }
          if (order.type === 'buy') {
            buyOrders.push(order)
          } else if (order.type === 'sell') {
            sellOrders.push(order)
          }
        })
        dispatch(setBuyOrders(buyOrders))
        dispatch(setSellOrders(sellOrders))
      }
    })
    .catch(err => {
      console.log('ERROR: Get Order Data')
    })
  }
}

// Reducer: to set buy orders inside store
export const setBuyOrders = (data) => {
  return {
    type: 'SET_BUY_ORDERS',
    payload: data
  }
}

// Reducer: to set buy orders inside store
export const setSellOrders = (data) => {
  return {
    type: 'SET_SELL_ORDERS',
    payload: data
  }
}

// To handle store changes in form input during buying form
export const handleChangesBuyingOrder = (e, buyTotal, buyPrice) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let target = e.target
    let inputId = target.id
    let value = target.value

    if (inputId === 'buyTotal') {
      dispatch(setTotalBuyInput(value))
    } else if (inputId === 'buyPrice') {
      dispatch(setBuyPriceInput(value))
    }

    let amount = 0
    let fee = 0
    let netAmount = 0

    if (buyTotal > 0 && buyPrice > 0) {
      amount = (buyTotal / buyPrice).toFixed(4)
      fee = (0.15 / 100 * amount).toFixed(4)
      netAmount = amount - fee
    }

    dispatch(setBuyAmountInput(amount))
    dispatch(setBuyFeeInput(fee))
    dispatch(setBuyNetAmountInput(netAmount))
  }
}

// Reducer: to set total buy order input
const setTotalBuyInput = (data) => {
  return {
    type: 'SET_BUY_TOTAL',
    payload: data
  }
}

// Reducer: to set price buy order input
const setBuyPriceInput = (data) => {
  return {
    type: 'SET_BUY_PRICE',
    payload: data
  }
}

// Reducer: to set amount buy order input
const setBuyAmountInput = (data) => {
  return {
    type: 'SET_BUY_AMOUNT',
    payload: data
  }
}

// Reducer: to set fee buy order input
const setBuyFeeInput = (data) => {
  return {
    type: 'SET_BUY_FEE',
    payload: data
  }
}

// Reducer: to set net amount buy order input
const setBuyNetAmountInput = (data) => {
  return {
    type: 'SET_BUY_NET_AMOUNT',
    payload: data
  }
}
