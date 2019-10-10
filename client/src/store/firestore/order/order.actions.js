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

// To handle store changes in form input during buying form
export const handleChangesBuyingOrder = (e, document) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let target = e.target
    let inputId = target.id
    let value = target.value

    let buyTotal = Number(document.getElementById('buyTotal').value)
    let buyPrice = Number(document.getElementById('buyPrice').value)
    let amount = 0
    let fee = 0
    let netAmount = 0

    if (inputId === 'buyTotal') {
      buyTotal = Number(value)
      dispatch(setTotalBuyInput(value))
    } else if (inputId === 'buyPrice') {
      buyPrice =  Number(value)
      dispatch(setBuyPriceInput(value))
    }


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
export const createBuyOrderConfirmation = (e, buyNetAmount) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    e.preventDefault();

    if (buyNetAmount > 0) {
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

export const handleBuyModalShow = (buyModalShow) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    if (buyModalShow) {
      buyModalShow = false
    } else {
      buyModalShow = true
    }
    
    dispatch(setBuyModalShow(buyModalShow))
  }
}

// Reducer: to set modal show status to true or false (hidden)
const setBuyModalShow = (data) => {
  return {
    type: 'SET_BUY_MODAL_SHOW',
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
      // send success status
      dispatch(setTotalBuyInput(0))
      dispatch(setBuyPriceInput(0))
      dispatch(setBuyAmountInput(0))
      dispatch(setBuyFeeInput(0))
      dispatch(setBuyNetAmountInput(0))
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
