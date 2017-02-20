import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { logIn } from '../actions/auth'
import '../styles/main.sass'

import TimezoneChecker from '../components/TimezoneChecker'
import CallPanel from '../components/CallPanel'
import Header from '../components/Header'
import Footer from '../components/Footer'

class App extends Component {
  static propTypes = {
    children: PropTypes.element,
    logIn: PropTypes.func,
  }
  componentWillMount() {
    this.props.logIn(this.props.token)
  }
  render() {
    return (
      <div className='app' >
        {/*<CallPanel />*/}
        <Header />
          {/*<TimezoneChecker />*/}
          <div className='app-content'>
            {this.props.children}
          </div>
        <Footer />
      </div>
    )
  }
}

export default connect(
  state => ({
    facebook_token: state.auth.facebook_token,
    token: state.auth.token,
  }),
  { logIn },
)(App)
