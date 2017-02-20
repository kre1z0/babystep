import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import rootReducer from '../reducers'

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true,
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * configureStore for development
 * @param <Object> browserHistory
 * @return <Object> store
 */
export default (browserHistory) => {
  const reduxRouterMiddleware = routerMiddleware(browserHistory)
  const createStoreWithMiddleware = composeEnhancers(applyMiddleware(
    reduxRouterMiddleware,
    thunkMiddleware,
    loggerMiddleware,
  ))(createStore)

  return createStoreWithMiddleware(rootReducer)
}
