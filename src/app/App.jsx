import '../fake-db'
import React from 'react'
import { Store } from './redux/Store'
import { Provider } from 'react-redux'
import { AllPages } from './routes/routes'
import { MatxTheme } from 'app/components'
import { useRoutes } from 'react-router-dom'
import { AuthProvider } from 'app/contexts/JWTAuthContext'
import { SettingsProvider } from 'app/contexts/SettingsContext'
import { StompProvider } from './contexts/StompContext'

const App = () => {
  const all_pages = useRoutes(AllPages())

  return (
    <Provider store={Store}>
      <SettingsProvider>
        <MatxTheme>
          <AuthProvider>
            <StompProvider>{all_pages}</StompProvider>
          </AuthProvider>
        </MatxTheme>
      </SettingsProvider>
    </Provider>
  )
}

export default App
