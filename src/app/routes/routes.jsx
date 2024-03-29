import AuthGuard from 'app/auth/AuthGuard'
import NotFound from 'app/views/sessions/NotFound'
import chartsRoute from 'app/views/charts/ChartsRoute'
import materialRoutes from 'app/views/material-kit/MaterialRoutes'
import dashboardRoutes from 'app/views/dashboard/DashboardRoutes'
import sessionRoutes from 'app/views/sessions/SessionRoutes'
import configSettingRoutes from 'app/views/config-setting/ConfigSettingRoutes'
import openOrderRoutes from 'app/views/open-order/OpenOrderRoutes'
import MatxLayout from '../components/MatxLayout/MatxLayout'
import { Navigate } from 'react-router-dom'

export const AllPages = () => {
  const all_routes = [
    {
      element: (
        <AuthGuard>
          <MatxLayout />
        </AuthGuard>
      ),
      children: [
        ...dashboardRoutes,
        ...configSettingRoutes,
        ...openOrderRoutes,
        ...chartsRoute,
        ...materialRoutes
      ]
    },
    ...sessionRoutes,
    {
      path: '/',
      element: <Navigate to="dashboard/default" />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ]

  return all_routes
}
