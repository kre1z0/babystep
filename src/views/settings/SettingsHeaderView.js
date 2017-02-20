import React, { Component, PropTypes } from 'react'
import { Link, IndexLink } from 'react-router'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'

class SettingHeader extends Component {
  static propTypes = {
    children: PropTypes.element,
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
      <DocumentTitle title='Settings' >
        <div className='app-content' >
          <div className='filter filter-settings'>
            <div className='container'>
              <div className='filter-flex'>
                <div className='filter-categories'>
                  <ul>
                    <li>
                      <IndexLink to='general' activeClassName='active'>
                        General
                      </IndexLink>
                    </li>
                    <li>
                      <Link to='expert' activeClassName='active'>
                        Expert
                      </Link>
                    </li>
                    <li>
                      <Link to='notifications' activeClassName='active'>
                        Notifications
                      </Link>
                    </li>
                    <li>
                      <Link to='credit-card' activeClassName='active'>
                        Billing
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {this.props.children}
        </div>
      </DocumentTitle>
    )
  }
}

export default connect(
  state => ({

  }),
  { },
)(SettingHeader)

