import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class Billing extends Component {
  static propTypes = {
    children: PropTypes.element,
  }
  constructor(props) {
    super(props)
    this.onClickSelect = this.onClickSelect.bind(this)
    this.state = {
      credit_card: true,
      paypal: false,
    }
  }
  componentDidMount() {
  }
  onClickSelect() {
    this.setState({
      credit_card: !true,
      paypal: !false,
    })
  }
  render() {
    console.log('billing', this.state)
    return (
      <div className='settings settings-billing'>
        <div className='container'>
          <div className='settings-general-flex'>
            <div className='form-wrapper'>
              <div className='billing-systems'>
                <div className='billing-system active'>
                  <Link to='credit-card' className='settings-header' activeClassName='active'>
                    Credit Card
                  </Link>
                </div>
                <div className='billing-system'>
                  <Link to='paypal' className='settings-header' activeClassName='active'>
                    Paypal
                  </Link>
                </div>
              </div>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
  }),
  {  },
)(Billing)
