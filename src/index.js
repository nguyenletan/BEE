import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'

import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './AuthenticateProvider'
// import i18n (needs to be bundled ;))
import './i18n';


// Put any other imports below so that CSS from your
// components takes precedence over default styles.

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
reportWebVitals(console.log)
