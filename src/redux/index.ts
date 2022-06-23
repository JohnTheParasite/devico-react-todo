import { applyMiddleware, createStore } from 'redux'
import rootReducer from '@/redux/reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import { sagaMiddleware, rootWatcher } from '@/redux/saga'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(rootWatcher)

export default store
