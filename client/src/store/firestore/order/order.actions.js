// PURPOSE: Actions documented in this store section is specialised to manipulate data from/to ORDERS's table

const Swal = require('sweetalert2')

// To get orders data from database
// Both buy and sell data
export const getOrders = (coinId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let ordersRef = firestore.collection('orderBooks')

    ordersRef
    .where('coinId', '==', coinId)
    .onSnapshot(snapshot => {
      let buyOrders = []
      let sellOrders = []
  
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
        dispatch(setIsOrderLoaded(true))
        dispatch(setBuyOrders(buyOrders))
        dispatch(setSellOrders(sellOrders))
      }
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

// Reducer: to set loading get order status
export const setIsOrderLoaded = (data) => {
  return {
    type: 'SET_GET_ORDER_LOADING_STATUS',
    payload: data
  }
}

// To handle store changes in form input during buying form
export const handleChangesBuyingOrder = (e, document) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let target = e.target
    let inputId = target.id
    let value = target.value

    // To continously update total, price, amount, fee and net amount information based on user input
    let buyTotal = Number(document.getElementById('buyTotal').value)
    let buyPrice = Number(document.getElementById('buyPrice').value)
    let amount = 0
    let fee = 0
    let netAmount = 0

    // Updating total and price information to store
    if (inputId === 'buyTotal') {
      buyTotal = Number(value)
      dispatch(setTotalBuyInput(value))
    } else if (inputId === 'buyPrice') {
      buyPrice =  Number(value)
      dispatch(setBuyPriceInput(value))
    }

    // If net amount is greater than 0 then update the information to store
    // Otherwise let it be 0 to show that user can't buy without fulfilling minimum amount
    if (buyTotal > 0 && buyPrice > 0) {
      amount = buyTotal / buyPrice
      fee = 0.15 / 100 * amount
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

// To create a new buy order confirmation based on user input
// Requirement:
// Send error messages if net amount entered is less and equal to 0
export const createBuyOrderConfirmation = (e, buyNetAmount) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    e.preventDefault();

    if (buyNetAmount > 0) {
      // Update loading status to true
      dispatch(setBuyLoadingStatus(true))
      // Update show modal status to true
      dispatch(setBuyModalShow(true))
    } else {
      // send error alert
      Swal.fire({
        title: 'Wrong Order.',
        text: 'Net Amount must be bigger than 0.',
        type: 'error',
        confirmButtonText: 'Cancel'
      })
    }
  }
}

// To handle buy modal show status (bootstrap requirement) to true (show) or false (hidden)
export const handleBuyModalShow = (buyModalShow) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    if (buyModalShow) {
      buyModalShow = false
    } else {
      buyModalShow = true
    }
    
    dispatch(setBuyModalShow(buyModalShow))
    dispatch(setBuyLoadingStatus(false))
  }
}

// Reducer: to set modal show status to true or false (hidden)
const setBuyModalShow = (data) => {
  return {
    type: 'SET_BUY_MODAL_SHOW',
    payload: data
  }
}

// Reducer: to set loading status during order buy confirmation
const setBuyLoadingStatus = (data) => {
  return {
    type: 'SET_BUY_LOADING_STATUS',
    payload: data
  }
}

// To create a new buy order after confirmation based on user input
export const createBuyOrder = (e, profile, coinId, buyTotal, buyPrice, buyAmount, buyFee, buyNetAmount) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    e.preventDefault();
    let firestore = getFirestore()
    let ordersRef = firestore.collection('orderBooks')

    let newOrder = {
      userId: profile.id,
      coinId,
      type: 'buy',
      total: Number(buyTotal),
      price: Number(buyPrice),
      amount: parseFloat(buyAmount),
      fee: parseFloat(buyFee),
      netAmount: parseFloat(buyNetAmount),
      createdDate: new Date(Date.now()),
      updatedDate: new Date(Date.now()),
    }

    ordersRef
    .add(newOrder)
    .then(ref => {
      // remove previous user input
      dispatch(setTotalBuyInput(0))
      dispatch(setBuyPriceInput(0))
      dispatch(setBuyAmountInput(0))
      dispatch(setBuyFeeInput(0))
      dispatch(setBuyNetAmountInput(0))
      // change loading status to false
      dispatch(setBuyLoadingStatus(false))
      // send success status
      Swal.fire({
        title: 'Buy Order Successful.',
        text: 'Your order has been received.',
        type: 'success',
        confirmButtonText: 'OK'
      })
    })
    .catch(err => {
      console.log('ERROR: Create Buy Order')
    })
  }
}

// -------------------------------------------------SELL--------------------------------------------------------

// To handle store changes in form input during selling form
export const handleChangesSellingOrder = (e, document) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let target = e.target
    let inputId = target.id
    let value = target.value

    // To continously update total, price, amount, fee and net amount information based on user input
    let sellAmount = Number(document.getElementById('sellAmount').value)
    let sellPrice = Number(document.getElementById('sellPrice').value)
    let total = 0
    let fee = 0
    let netAmount = 0

    // Updating total and price information to store
    if (inputId === 'sellAmount') {
      sellAmount = Number(value)
      dispatch(setSellAmountInput(value))
    } else if (inputId === 'sellPrice') {
      sellPrice =  Number(value)
      dispatch(setSellPriceInput(value))
    }

    // If net amount is greater than 0 then update the information to store
    // Otherwise let it be 0 to show that user can't buy without fulfilling minimum amount
    if (sellAmount > 0 && sellPrice > 0) {
      total = sellAmount * sellPrice
      fee = 0.15 / 100 * total
      netAmount = total - fee
    } 

    dispatch(setTotalSellInput(total))
    dispatch(setSellFeeInput(fee))
    dispatch(setSellNetAmountInput(netAmount))
  }
}

// Reducer: to set total sell order input
const setTotalSellInput = (data) => {
  return {
    type: 'SET_SELL_TOTAL',
    payload: data
  }
}

// Reducer: to set price sell order input
const setSellPriceInput = (data) => {
  return {
    type: 'SET_SELL_PRICE',
    payload: data
  }
}

// Reducer: to set amount sell order input
const setSellAmountInput = (data) => {
  return {
    type: 'SET_SELL_AMOUNT',
    payload: data
  }
}

// Reducer: to set fee sell order input
const setSellFeeInput = (data) => {
  return {
    type: 'SET_SELL_FEE',
    payload: data
  }
}

// Reducer: to set net amount sell order input
const setSellNetAmountInput = (data) => {
  return {
    type: 'SET_SELL_NET_AMOUNT',
    payload: data
  }
}

// To create a new sell order confirmation based on user input
export const createSellOrderConfirmation = (e, sellNetAmount) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    e.preventDefault();

    if (sellNetAmount > 0) {
      dispatch(setSellLoadingStatus(true))
      dispatch(setSellModalShow(true))
    } else {
      // send error alert
      Swal.fire({
        title: 'Wrong Order.',
        text: 'Net Amount must be bigger than 0.',
        type: 'error',
        confirmButtonText: 'Cancel'
      })
    }
  }
}

// To handle sell modal show status (bootstrap requirement) to true (show) or false (hidden)
export const handleSellModalShow = (sellModalShow) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    if (sellModalShow) {
      sellModalShow = false
    } else {
      sellModalShow = true
    }
    
    dispatch(setSellModalShow(sellModalShow))
    dispatch(setSellLoadingStatus(false))
  }
}

// Reducer: to set sell modal show status to true or false (hidden)
const setSellModalShow = (data) => {
  return {
    type: 'SET_SELL_MODAL_SHOW',
    payload: data
  }
}

// Reducer: to set loading status during order sell  confirmation
const setSellLoadingStatus = (data) => {
  return {
    type: 'SET_SELL_LOADING_STATUS',
    payload: data
  }
}

// To create a new sell order after confirmation based on user input
export const createSellOrder = (e, profile, coinId, sellTotal, sellPrice, sellAmount, sellFee, sellNetAmount) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    e.preventDefault();
    let firestore = getFirestore()
    let ordersRef = firestore.collection('orderBooks')

    let newOrder = {
      userId: profile.id,
      coinId,
      type: 'sell',
      total: Number(sellTotal),
      price: Number(sellPrice),
      amount: parseFloat(sellAmount),
      fee: parseFloat(sellFee),
      netAmount: parseFloat(sellNetAmount),
      createdDate: new Date(Date.now()),
      updatedDate: new Date(Date.now()),
    }

    ordersRef
    .add(newOrder)
    .then(ref => {
      // remove previous form input
      dispatch(setSellAmountInput(0))
      dispatch(setSellPriceInput(0))
      dispatch(setTotalSellInput(0))
      dispatch(setSellFeeInput(0))
      dispatch(setSellNetAmountInput(0))
      // change loading status to false
      dispatch(setSellLoadingStatus(false))
      // send success status
      Swal.fire({
        title: 'Sell Order Successful.',
        text: 'Your order has been received.',
        type: 'success',
        confirmButtonText: 'OK'
      })
    })
    .catch(err => {
      console.log('ERROR: Create Sell Order')
    })

  }
}