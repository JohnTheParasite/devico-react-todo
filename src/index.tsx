import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'
import store from '@/redux'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import './core.scss'

const appContainer = ReactDOM.createRoot(document.getElementById('app') as HTMLElement)
appContainer.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
