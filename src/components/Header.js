import React, { Component, PropTypes } from 'react'
// ➡ https://github.com/ReactTraining/react-router
import { Link, IndexLink } from 'react-router'
import shortid from 'shortid'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { logOut } from '../actions/auth'

class Header extends Component {
  static propTypes = {
    logOut: PropTypes.func,
    user: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.onClickToggleClass = this.onClickToggleClass.bind(this)
    this.state = {
      account_link: false,
    }
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  onClickToggleClass() {
    this.setState({
      account_link: !this.state.account_link,
    })
  }

  render() {
    console.log('HEADER', this.props)
    let navLinks
    if (this.props.user.user_type === 'expert') {
      navLinks = [
        {
          url: '/expert/inbox',
          title: 'ЭКСПЕРТ',
        },
        {
          url: '/expert/inbox',
          title: 'Inbox',
        },
        {
          url: '/expert/availability',
          title: 'Availability',
        },
        {
          url: '/expert/inbox',
          title: 'Inbox',
        },
        {
          url: '/expert/availability',
          title: 'Availability',
        },
        {
          url: '/expert/inbox',
          title: 'Inbox',
        },
      ]
    } else if (this.props.user.user_type === 'client') {
      navLinks = [
        {
          url: '/expert/inbox',
          title: 'Лучший юзер на свете',
        },
        {
          url: '/expert/inbox',
          title: 'Browse',
        },
        {
          url: '/expert/inbox',
          title: 'Answer',
        },
        {
          url: '/expert/inbox',
          title: 'How it works',
        },
      ]
    } else {
      navLinks = [
        {
          url: '/expert/inbox',
          title: 'Какой то залетный парень гость',
        },
      ]
    }
    const accountLink = classNames('account-link', { active: this.state.account_link })
    return (
      <div className='header' >
        <div className='header-container' >
          <div className='header-left-menu' >
            <IndexLink to='/' className='logo' >
              <img src='http://placehold.it/200x60' alt='logo' />
            </IndexLink>
          </div>
          <nav>
            <ul>
              {
                navLinks.map(link =>
                  (
                    <li key={shortid.generate()}>
                      <Link to='inbox' activeClassName='active' >
                        {link.title}
                      </Link>
                    </li>
                  ),
                )
              }
            </ul>
          </nav>
          <div className='header-right-menu' >
            <div className='notifications' >
              <i className='fa fa-bell-o' aria-hidden='true' />
              <div className='notifications-popup' >
                <div className='notifications-popup-none' >
                  <div className='notifications-popup-icon' />
                  <div className='notifications-popup-caption' >You have no new notifications</div>
                </div>

                <div className='notifications-popup-more' >See all notifications</div>
              </div>
            </div>
            <div className={accountLink} onClick={this.onClickToggleClass} >
              <img src={this.props.user.photos.photo_small_url} alt='' />
              <i className='fa fa-caret-down' aria-hidden='true' />

              <div className='account-popup' >
                <div className='account-popup-username' >{this.props.user.name}</div>
                <ul className='account-popup-list' >
                  <li><Link to='general' >Settings</Link></li>
                  <li><a onClick={this.props.logOut} >Sign out</a></li>
                </ul>
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
    user: state.auth.user_data,
  }),
  { logOut },
)(Header)
