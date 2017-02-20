import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getAccountInfo } from '../actions/auth'

class EditAccountSettings extends Component {
  static propTypes = {
    twitch: PropTypes.array,
  }
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {
    this.props.getAccountInfo()
  }
  render() {
    console.log('edit data', this.props)
    return (
      <div>
        <h1>Edit account setings</h1>
        <div>
          <input name='timezone' type='text' value={this.props.user_data.timezone} />
        </div>
        <div>
          <input name='postal_code:' type='text' value='postal_code' />
        </div>
        <div>
          <input name='country_code_2char:' type='text' value='country_code_2char' />
        </div>
        <div>
          <input name='avatar:' type='file' />
        </div>
        {/*Experts*/}
        <div>
          <input name='Price_per_hour' type='text' value='Price_per_hour' />
        </div>
        <div>
          <input name='Price_per_hour_currency:' type='text' value='Price_per_hour_currency:' />
        </div>
        <div>
          <textarea name='Full_about_me' type='text' value='Full_about_me' />
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    user_data: state.auth.user_data,
  }),
  { getAccountInfo },
)(EditAccountSettings)
