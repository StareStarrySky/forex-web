import { combineReducers } from 'redux'
import ScrumBoardReducer from './ScrumBoardReducer'
import NotificationReducer from './NotificationReducer'
import EcommerceReducer from './EcommerceReducer'
import NavigationReducer from './NavigationReducer'
import ConfigSettingReducer from './ConfigSettingReducer'

const RootReducer = combineReducers({
  notifications: NotificationReducer,
  navigations: NavigationReducer,
  scrumboard: ScrumBoardReducer,
  ecommerce: EcommerceReducer,
  configSetting: ConfigSettingReducer
})

export default RootReducer
