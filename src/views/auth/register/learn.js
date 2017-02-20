import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { registerNextStep } from '../../../actions/auth'

class LearnView extends Component {
  static propTypes = {
    registerNextStep: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
  }
  render() {
    console.log('learh', this.props)
    return (
      <div className='how-works' >
        <h2 className='text-center' >How it works</h2>

        <div className='container' >
          <div className='how-works-features' >
            <div className='how-works-features-item' >
              <img src='http://placehold.it/100x100' alt='' />
              <h3>Find an Expert</h3>
              <p>Browse our community of experts to find the right one for you.</p>
            </div>
            <div className='how-works-features-item' >
              <img src='http://placehold.it/100x100' alt='' />
              <h3>Request a Call</h3>
              <p>At this time, you will be pre-charged for the estimated length of the call, based on the expert's
                per-minute rate.</p>
            </div>
            <div className='how-works-features-item' >
              <img src='http://placehold.it/100x100' alt='' />
              <h3>Connect Directly</h3>
              <p>Call the conference line provided. After the call, the charge will be adjusted to reflect actual length
                of the call.</p>
            </div>
          </div>
          <div className='text-center' >
            <Link to='set-up' className='btn btn-got-it' >
              Got it
            </Link>
          </div>

        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
  }),
  { registerNextStep },
)(LearnView)
