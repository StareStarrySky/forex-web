import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from 'app/auth/authRoles'

const ConfigSettingForm = Loadable(lazy(() => import('./config-setting-form/ConfigSettingForm')))

const ConfigSettingRoutes = [
  {
    path: '/config-setting/form',
    element: <ConfigSettingForm />,
    auth: authRoles.editor
  }
]

export default ConfigSettingRoutes
