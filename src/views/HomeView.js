import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { getAccountInfo } from '../actions/auth'
import {
  getAllExperts, getExpertById,
  getExpertBalance, getAllExpertsProducts,
  getExpertProductsById, getExpertGreenTime, addGreenTime,
} from '../actions/information'
import { editAccountInfo } from '../actions/profile'

class Home extends Component {
  constructor(props) {
    super(props)
    this.click = this.click.bind(this)
  }

  componentDidMount() {

  }

  click() {
    this.props.editAccountInfo({
      Avatar_image: values.upload_photo[0],
    })
    // this.props.getAccountInfo()
    // this.props.getExpertById('A184')

    // this.props.getExpertGreenTime('AKpz')
    // const parameters = {
    //   Avatar_image: 'http://veralline.com/uploads/images/comparison/2015/04/22/05ac478a8d.jpg',
    // }
    // this.props.editAccountInfo(parameters)
    // const params = {
    //   id: 'AKpz',
    //   start_at: '2016-12-28T05:00:00+02:00',
    //   end_at: '2016-12-28T22:00:00+02:00',
    // }
    // console.log('start', moment('2016-12-27T05:00:00+0200').format('MMMM Do YYYY, h:mm:ss a'))
    // console.log('start', moment('2016-12-27T22:00:00+0200').format('MMMM Do YYYY, h:mm:ss a'))
    // console.log('params', params)
    // this.props.addGreenTime(params)
    // this.props.getExpertBalance()
    // this.props.getAllExpertsProducts()
    // this.props.getExpertProductsById('A184')
  }

  render() {
    console.log('this props', this.props)
    let geo
    if (this.props.user.geo) {
      geo = (
        <div>
          <p>
            <strong>Country</strong><span>:&nbsp;{this.props.user.geo.country_name}</span>
          </p>
          <p>
            <strong>City</strong><span>:&nbsp;{this.props.user.geo.title}</span>
          </p>
          <p>
            <strong>Postal code</strong><span>:&nbsp;{this.props.user.geo.postal_code}</span>
          </p>
        </div>
      )
    }
    return (
      <div className='welcome' >
        <div className='container' >
          <div className='welcome-flex' >
            <div className='welcome-left' >
              <h1 className='welcome-header' >Welcome, {this.props.user.name}</h1>
              <img src={this.props.user.photos.photo_normal_url} alt='' />
              <p>
                <strong>timezone</strong><span>:&nbsp;{this.props.user.timezone}</span>
              </p>
              {geo}
            </div>
            <button onClick={this.click} >click</button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    facebook_token: state.auth.facebook_token,
    token: state.auth.token,
    experts: state.information.experts,
    user: state.auth.user_data,
  }),
  {
    getAccountInfo,
    getAllExperts,
    getExpertById,
    getExpertBalance,
    getAllExpertsProducts,
    getExpertProductsById,
    getExpertGreenTime,
    addGreenTime,
    editAccountInfo,
  },
)(Home)
