import React from 'react'
import App from './app/App'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
// import * as serviceWorker from './serviceWorker'
import { StyledEngineProvider } from '@mui/styled-engine'
import { CssBaseline } from '@mui/material'
import pkg from '../package.json'

document.ver = pkg.version

createRoot(document.getElementById('root')).render(
  <StyledEngineProvider injectFirst>
    <BrowserRouter>
      <CssBaseline />
      <App />
    </BrowserRouter>
  </StyledEngineProvider>
)

// for IE-11 support un-comment cssVars() and it's import in this file
// and in MatxTheme file

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register()
