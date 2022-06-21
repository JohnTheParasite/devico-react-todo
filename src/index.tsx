import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'
import store from '@/redux'
import { Provider } from 'react-redux'
import './core.scss'

const appContainer = ReactDOM.createRoot(document.getElementById('app') as HTMLElement)
appContainer.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
