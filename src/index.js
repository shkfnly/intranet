import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
// import { BrowserRouter } from 'react-router-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import createSagaMiddleware from 'redux-saga'

import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'

import reducers from './reducers'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
)
ReactDOM.render(
  (<Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */ }
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>),
  document.getElementById('root')
)
registerServiceWorker()
// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))
