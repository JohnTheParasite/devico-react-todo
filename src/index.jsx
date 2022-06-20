import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'
import './core.scss'
import store from '@/redux'
import { Provider } from 'react-redux'

const appContainer = ReactDOM.createRoot(document.getElementById('app'))
appContainer.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
