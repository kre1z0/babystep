import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class CreditCard extends Component {
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
      <form action='#' className='credit-card'>
        <div className='input-group'>
          <label htmlFor='card-number'>Card number</label>
          <input id='card-number' type='text' />
        </div>

        <div className='input-group input-group-two'>
          <div className='input-group-col'>
            <label htmlFor='expiration'>Expiration</label>
            <input id='expiration' type='text' placeholder='MM / YY' />
          </div>

          <div className='input-group-col'>
            <label htmlFor='cvc'>CVC</label>
            <input id='cvc' type='text' />
          </div>

        </div>

        <div className='input-group'>
          <label htmlFor='state'>State / Province</label>
          <input id='state' type='text' />
        </div>

        <div className='input-group'>
          <label htmlFor='age'>Postal code / ZIP</label>
          <input id='age' type='text' />
        </div>

        <div className='input-group'>
          <label htmlFor='country'>Country</label>
          <input id='country' type='text' />
        </div>

        <div className='input-group'>
          <label htmlFor='address'>Address</label>
          <input id='address' type='text' />
        </div>

        <div className='input-group'>
          <label htmlFor='city'>City</label>
          <input id='city' type='text' />
        </div>

        <input type='submit' className='btn btn-green' value='Save card' />
      </form>
    )
  }
}

export default connect(
  state => ({
  }),
  { },
)(CreditCard)
