import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from 'AuthenticateProvider'
import App from './App'
import './index.scss'
import './i18n'

const root = createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, uncomment the following line
// import reportWebVitals from './reportWebVitals';
// reportWebVitals(console.log);
