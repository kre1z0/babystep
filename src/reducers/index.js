import { combineReducers } from 'redux'
// ➡ https://github.com/reactjs/react-router-redux
import { routerReducer } from 'react-router-redux'
// ➡ https://redux-form.com/6.4.1/docs/GettingStarted.md/
import { reducer as formReducer } from 'redux-form'
import auth from './auth'
import information from './information'
import availability from './availability'

const rootReducer = combineReducers({
  auth,
  information,
  availability,
  routing: routerReducer,
  form: formReducer,
})

export default rootReducer
