import { combineReducers } from 'redux'
import ScrumBoardReducer from './ScrumBoardReducer'
import NotificationReducer from './NotificationReducer'
import EcommerceReducer from './EcommerceReducer'
import NavigationReducer from './NavigationReducer'
import ConfigSettingReducer from './ConfigSettingReducer'
import OpenOrderReducer from './OpenOrderReducer'

const RootReducer = combineReducers({
  notifications: NotificationReducer,
  navigations: NavigationReducer,
  scrumboard: ScrumBoardReducer,
  ecommerce: EcommerceReducer,
  configSetting: ConfigSettingReducer,
  openOrder: OpenOrderReducer
})

export default RootReducer
