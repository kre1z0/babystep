import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class SettingExpertView extends Component {
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
      <div className='settings settings-expert'>
        <div className='container'>
          <div className='settings-general-flex'>
            <div className='settings-general-right'>
              <div className='htmlForm-wrapper'>
                <h2 className='settings-header'>Expert profile</h2>
                <htmlForm action='#'>
                  <div className='input-group'>
                    <label htmlFor='short-simmary'>Short summary</label>
                    <input id='short-simmary' type='text' />
                  </div>

                  <div className='input-group'>
                    <label htmlFor='full-story'>Full story</label>
                    <textarea id='full-story' />
                  </div>

                  <input type='submit' className='btn btn-green' value='Save profile' />
                </htmlForm>
              </div>
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
  { },
)(SettingExpertView)
