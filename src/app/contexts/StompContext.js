import { Client } from '@stomp/stompjs'
import { createContext, useEffect, useReducer, useState } from 'react'
import Push from 'push.js'

export const STOMP_CONNECTED = 'STOMP_CONNECTED'
export const STOMP_MESSAGE = 'STOMP_MESSAGE'
export const STOMP_MSGERROR = 'STOMP_MSGERROR'
export const STOMP_DISCONNECTED = 'STOMP_DISCONNECTED'

const reducer = (state, action) => {
  switch (action.type) {
    case STOMP_CONNECTED: {
      return {
        ...state,
        status: action.payload
      }
    }
    case STOMP_MESSAGE: {
      return {
        ...state,
        status: action.payload
      }
    }
    case STOMP_MSGERROR: {
      return {
        ...state,
        status: action.payload
      }
    }
    case STOMP_DISCONNECTED: {
      return {
        ...state,
        status: action.payload
      }
    }
    default: {
      return { ...state }
    }
  }
}

const StompContext = createContext({
  clientStatus: '',
  clientActivate: () => {},
  clientCallback: () => {}
})

export const StompProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, [])

  const [client] = useState(
    new Client({
      brokerURL:
        process.env.REACT_APP_STOMP_PROTOCOL +
        '://' +
        window.location.host +
        process.env.REACT_APP_BASE_API +
        '/order',
      connectionTimeout: 8000
    })
  )

  useEffect(() => {
    client.configure({
      onConnect: () => {
        dispatch({ type: STOMP_CONNECTED, payload: STOMP_CONNECTED })
        client.subscribe(process.env.REACT_APP_STOMP_BROKER + '/forex-web', (message) => {
          dispatch({ type: STOMP_MESSAGE, payload: STOMP_MESSAGE })
          let stomp = JSON.parse(message.body)
          Push.create(stomp.title, {
            body: stomp.body,
            icon: '/favicon.ico',
            requireInteraction: true
          })
        })
      },
      onDisconnect: () => {
        dispatch({ type: STOMP_DISCONNECTED, payload: STOMP_DISCONNECTED })
      },
      onStompError: () => {
        dispatch({ type: STOMP_MSGERROR, payload: STOMP_MSGERROR })
      }
    })
    return () => {
      if (client.active) {
        client.deactivate()
      }
    }
  }, [client])

  const clientActivate = () => {
    if (!client.active) {
      client.activate()
    }
  }

  const clientCallback = ({ connected, message, msgError, disconnected, defaultCall }) => {
    switch (state.status) {
      case STOMP_CONNECTED:
        connected()
        break
      case STOMP_MESSAGE:
        message()
        break
      case STOMP_MSGERROR:
        msgError()
        break
      case STOMP_DISCONNECTED:
        disconnected()
        break
      default:
        defaultCall()
    }
  }

  return (
    <StompContext.Provider
      value={{
        clientStatus: state.status,
        clientActivate,
        clientCallback
      }}
    >
      {children}
    </StompContext.Provider>
  )
}

export default StompContext
