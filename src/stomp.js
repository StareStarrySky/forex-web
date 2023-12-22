import { Client } from '@stomp/stompjs'
import Push from 'push.js'

const orderClient = new Client({
  brokerURL:
    process.env.REACT_APP_STOMP_PROTOCOL +
    '://' +
    window.location.host +
    process.env.REACT_APP_BASE_API +
    '/order',
  onConnect: () => {
    orderClient.subscribe(process.env.REACT_APP_STOMP_BROKER + '/forex-web', (message) => {
      let stomp = JSON.parse(message.body)
      Push.create(stomp.title, {
        body: stomp.body,
        icon: '/favicon.ico',
        requireInteraction: true
      })
    })
  },
  connectionTimeout: 8000
})

export default orderClient
