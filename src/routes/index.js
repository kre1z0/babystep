import React from 'react'
import { IndexRoute, Route } from 'react-router'

// ――――――――――――――Base containers――――――――――――――
import App from '../containers/app'

// ――――――――――――――――――――――――――Views――――――――――――――――――――――――――――
// ➡ auth
import LoginView from '../views/auth/login'
import RegisterHeader from '../views/auth/register/header'
import LearnView from '../views/auth/register/learn'
import RegisterView from '../views/auth/register/setup'
import StartQuestionView from '../views/auth/register/question'
// ➡ settings
import Header from '../views/settings/SettingsHeaderView'
import General from '../views/settings/GeneralView'
import Expert from '../views/settings/ExpertView'
import Notifications from '../views/settings/NotificationsView'

import Billing from '../views/settings/BillingView'
import CreditCard from '../components/CreditCard'
import Paypal from '../components/Paypal'

import Availability from '../views/expert/Availability'
import Home from '../views/HomeView'
import NotFound from '../views/notfound'

/**
 * Configure routes
 * @param <Object> store
 * @return <Object> routes
 */
export default(store) => {
  function checkExpert(ее) {
    const tt = store.getState().auth
    console.log('auth', ее, tt)
  }
  return (
    <Route component={App} onEnter={checkExpert(store)} >
      <Route path='login' component={LoginView} />
      <Route path='/learn' component={RegisterHeader} >
        <IndexRoute component={LearnView} />
        <Route path='/set-up' component={RegisterView} />
        <Route path='/start-question' component={StartQuestionView} />
      </Route>
      <Route path='/' component={Home} />
      <Route path='availability' component={Availability} />
      <Route path='/general' component={Header} >
        <IndexRoute component={General} />
        <Route path='/expert' component={Expert} />
        <Route path='/notifications' component={Notifications} />
        <Route path='/credit-card' component={Billing} >
          <IndexRoute component={CreditCard} />
          <Route path='/paypal' component={Paypal} />
        </Route>
      </Route>
      <Route path='*' component={NotFound} />
    </Route>
  )
}
