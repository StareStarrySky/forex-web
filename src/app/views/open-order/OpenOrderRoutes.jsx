import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from 'app/auth/authRoles'

const OpenOrderTable = Loadable(lazy(() => import('./open-order-table/OpenOrderTable')))

const OpenOrderRoutes = [
  {
    path: '/open-order/table',
    element: <OpenOrderTable />,
    auth: authRoles.editor
  }
]

export default OpenOrderRoutes
