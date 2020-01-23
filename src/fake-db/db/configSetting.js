import Mock from 'fake-db/mock.js'

const configSettingDB = {
  configSetting: [
    {
      instrument: {
        name: 'GBPJPY'
      },
      canTrade: true,
      fuse: 4,
      curFuse: 0,
      bufferRandom: 8,
      tradeAmount: 0.001,
      passageways: [
        {
          top: 166.1,
          bottom: 165.9
        },
        {
          top: 164.1,
          bottom: 163.9
        },
        {
          top: 162.1,
          bottom: 161.9
        }
      ],
      curPassageway: {
        top: 162.1,
        bottom: 161.9
      }
    }
  ]
}

Mock.onGet('/api/config-setting').reply(() => {
  return [200, configSettingDB.configSetting]
})

Mock.onPut('/api/config-setting').reply((config) => {
  configSettingDB.configSetting = JSON.parse(config.data)
  return [200, configSettingDB.configSetting]
})
