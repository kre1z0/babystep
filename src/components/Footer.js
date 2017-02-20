import React, { Component, PropTypes } from 'react'

class Footer extends Component {
  render () {
    return (
      <footer className='footer'>
        <div className='container'>
          <div className='clearfix'>
            <div className='footer-list-wrap'>
              <h3>Company</h3>
              <ul className='footer-list'>
                <li><a href='#'>About</a></li>
                <li><a href='#'>Careers</a></li>
                <li><a href='#'>Press</a></li>
                <li><a href='#'>Blog</a></li>
              </ul>
            </div>

            <div className='footer-list-wrap'>
              <h3>Expert</h3>
              <ul className='footer-list'>
                <li><a href='#'>Become a Expert</a></li>
                <li><a href='#'>Help</a></li>
              </ul>
            </div>
          </div>

          <div className='copyright'>
            <span>© Babystep, Inc. 2016</span>
            <ul className='copyright-links'>
              <li><a href='#'>Help</a></li>
              <li><a href='#'>Privacy</a></li>
              <li><a href='#'>Terms</a></li>
            </ul>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
