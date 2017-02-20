import React, { Component, PropTypes } from 'react'
import { Link, IndexLink } from 'react-router'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'

class RegisterHeader extends Component {
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
      <DocumentTitle title='Регистрация' >
        <div className='app-content register'>
          <div className='breadcrumbs'>
            <IndexLink to='learn' activeClassName='active'>
              Learn
            </IndexLink>
            <Link to='set-up' activeClassName='active'>
              Set up
            </Link>
            <Link to='start-question' activeClassName='active'>
              Start question
            </Link>
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
)(RegisterHeader)
