import Mock from 'fake-db/mock.js'

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
        profitLossInAccountCurrency: -1.04
      }
    },
    orders: [
      {
        id: '162080303',
        label: 'ZXY_IVF20220404_22100040744867',
        fillTime: 1649081400703,
        instrument: 'GBP/JPY',
        orderCommand: 'BUY',
        openPrice: 161.251,
        originalAmount: 0.001,
        profitLossInPips: -12.7,
        profitLossInAccountCurrency: -1.04
      }
    ]
  }
}

Mock.onGet('/open-order').reply((config) => {
  return [200, openOrderDB.openOrder]
})
