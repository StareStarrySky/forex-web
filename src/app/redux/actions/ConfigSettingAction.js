import axios from 'axios.js'

export const GET_CONFIGSETTING = 'GET_CONFIGSETTING'
export const CREATE_CONFIGSETTING = 'CREATE_CONFIGSETTING'
export const DELETE_CONFIGSETTING = 'DELETE_CONFIGSETTING'
export const DELETE_ALL_CONFIGSETTING = 'DELETE_ALL_CONFIGSETTING'

export const getConfigSetting = () => (dispatch) => {
  axios.get('/config-setting').then((res) => {
    dispatch({
      type: GET_CONFIGSETTING,
      payload: res.data
    })
  })
}

export const saveConfigSetting = (form) => (dispatch) => {
  axios.put('/config-setting', form).then((res) => {
    dispatch({
      type: GET_CONFIGSETTING,
      payload: res.data
    })
  })
}
