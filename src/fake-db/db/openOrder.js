import Mock from 'fake-db/mock.js'
import { pathToRegexp } from 'path-to-regexp'

const openOrderDB = {
  openOrder: {
    order: {
      GBPJPY: {
        id: '162080303',
        label: 'ZXY_IVF20220404_22100040744867',
        fillTime: 1649081400703,
        instrument: 'GBP/JPY',
        orderCommand: 'BUY',
        openPrice: 161.251,
        originalAmount: 0.001,
        profitLossInPips: -12.7,
        profitLossInAccountCurrency: -1.04,
        stopLossPrice: 0
      }
    },
    orders: [
      {
        id: '162080303',
        label: 'IVF20220404_22100040744867',
        fillTime: 1649081400703,
        instrument: 'GBP/JPY',
        orderCommand: 'BUY',
        openPrice: 161.251,
        originalAmount: 0.001,
        profitLossInPips: -12.7,
        profitLossInAccountCurrency: -1.04,
        stopLossPrice: 0
      }
    ]
  }
}

Mock.onGet('/api/open-order').reply(() => {
  return [200, openOrderDB.openOrder]
})

Mock.onDelete(pathToRegexp('/api/open-order/:orderId')).reply((orderId) => {
  openOrderDB.openOrder.orders.splice(0, 1)
  return [200, openOrderDB.openOrder]
})

Mock.onPut(pathToRegexp('/api/open-order/:orderId/order-command')).reply((orderId) => {
  openOrderDB.openOrder.order.GBPJPY.orderCommand = 'SELL'
  return [200, openOrderDB.openOrder]
})
