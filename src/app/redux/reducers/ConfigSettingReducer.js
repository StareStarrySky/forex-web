import {
  GET_CONFIGSETTING,
  CREATE_CONFIGSETTING,
  DELETE_ALL_CONFIGSETTING,
  DELETE_CONFIGSETTING
} from '../actions/ConfigSettingAction'

const initialState = []

const ConfigSettingReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_CONFIGSETTING: {
      return [...action.payload]
    }
    case CREATE_CONFIGSETTING: {
      return [...action.payload]
    }
    case DELETE_CONFIGSETTING: {
      return [...action.payload]
    }
    case DELETE_ALL_CONFIGSETTING: {
      return [...action.payload]
    }
    default: {
      return [...state]
    }
  }
}

export default ConfigSettingReducer
