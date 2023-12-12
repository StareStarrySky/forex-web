import {
  OPENORDER_GET,
  OPENORDER_DELETE,
  OPENORDER_SWAP_COMMAND,
  OPENORDER_CREATE
} from '../actions/OpenOrderAction'

const initialState = {}

const OpenOrderReducer = function (state = initialState, action) {
  switch (action.type) {
    case OPENORDER_GET: {
      return {
        ...state,
        ...action.payload
      }
    }
    case OPENORDER_DELETE: {
      return {
        ...state,
        ...action.payload
      }
    }
    case OPENORDER_SWAP_COMMAND: {
      return {
        ...state,
        ...action.payload
      }
    }
    case OPENORDER_CREATE: {
      return {
        ...state,
        ...action.payload
      }
    }
    default: {
      return { ...state }
    }
  }
}

export default OpenOrderReducer
