import axios from 'axios.js'

export const OPENORDER_GET = 'OPENORDER_GET'
export const OPENORDER_DELETE = 'OPENORDER_DELETE'
export const OPENORDER_SWAP_COMMAND = 'OPENORDER_SWAP_COMMAND'
export const OPENORDER_CREATE = 'OPENORDER_CREATE'

export const getOrders = () => (dispatch) => {
  axios.get('/open-order').then((res) => {
    dispatch({
      type: OPENORDER_GET,
      payload: res.data
    })
  })
}

export const closeOrder = (orderId) => (dispatch) => {
  axios.delete('/open-order/' + orderId).then((res) => {
    dispatch({
      type: OPENORDER_DELETE,
      payload: res.data
    })
  })
}

export const changeOrderCommand = (orderId) => (dispatch) => {
  axios.put('/open-order/' + orderId + '/order-command').then((res) => {
    dispatch({
      type: OPENORDER_SWAP_COMMAND,
      payload: res.data
    })
  })
}

export const createOrder = (instrument, orderCommand) => (dispatch) => {
  axios.post('/open-order/' + instrument + '/' + orderCommand).then((res) => {
    dispatch({
      type: OPENORDER_CREATE,
      payload: res.data
    })
  })
}
