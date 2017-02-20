import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Paypal extends Component {
  static propTypes = {
    twitch: PropTypes.array,
  }
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className='paypal'>
        <p className='paypal-not-found'>I don&#39;t have a PayPal account yet</p>
        <a className='btn btn-green'>Sign up htmlFor PayPal</a>
      </div>
    )
  }
}

export default connect(
  state => ({
  }),
  { },
)(Paypal)
