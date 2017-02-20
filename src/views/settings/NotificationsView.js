import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Notifications extends Component {
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
      <div className='settings settings-notifications'>
        <div className='container'>
          <div className='settings-general-flex'>
            <div className='settings-notification'>
              <h2 className='settings-header'>Emails</h2>

              <div className='cntr'>
                <div className='row press'>
                  <div className='notification-caption'>Call Reminder</div>
                  <div className='notification-toggle'>
                    <input type='checkbox' id='email' className='cbx hidden' defaultChecked />
                    <label htmlFor='email' className='lbl' />
                  </div>
                </div>

                <div className='row press'>
                  <div className='notification-caption'>Recommendations</div>
                  <div className='notification-toggle'>
                    <input type='checkbox' id='recommendations' className='cbx hidden' defaultChecked />
                    <label htmlFor='recommendations' className='lbl' />
                  </div>
                </div>

                <div className='row press'>
                  <div className='notification-caption'>Updates product</div>
                  <div className='notification-toggle'>
                    <input type='checkbox' id='updates' className='cbx hidden' defaultChecked />
                    <label htmlFor='updates' className='lbl' />
                  </div>
                </div>
              </div>

              <div className='notification-target'>Your email is egorfdrv@gmail.com (edit)</div>
            </div>

            <div className='settings-notification'>
              <h2 className='settings-header'>SMS</h2>

              <div className='cntr'>
                <div className='row press'>
                  <div className='notification-caption'>Call Management</div>
                  <div className='notification-toggle'>
                    <input type='checkbox' id='call-managment' className='cbx hidden' defaultChecked />
                    <label htmlFor='call-managment' className='lbl' />
                  </div>
                </div>

                <div className='row press'>
                  <div className='notification-caption'>Call Reminders</div>
                  <div className='notification-toggle'>
                    <input type='checkbox' id='call-reminders' className='cbx hidden' defaultChecked />
                    <label htmlFor='call-reminders' className='lbl' />
                  </div>
                </div>
              </div>

              <div className='notification-target'>Your phone is 2120241 324234 (edit)</div>
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
)(Notifications)
