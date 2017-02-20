import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { validate } from '../../../validators/register'
import { registration, refreshPhoto } from '../../../actions/auth'
import { editAccountInfo } from '../../../actions/profile'
import { renderInput } from '../../../components/ui/input'

class RegisterView extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    registration: PropTypes.func,
    refreshPhoto: PropTypes.func,
    initialize: PropTypes.func,
    login_method: PropTypes.string,
    facebook_token: PropTypes.string,
    user: PropTypes.object,
    photo: PropTypes.object,
    error_register: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = {}
    this.handlerSubmit = this.handlerSubmit.bind(this)
  }

  componentDidMount() {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
    const value = this.props.user
    const data = {
      firstName: value.first_name,
      lastName: value.last_name,
      email: value.email,
      coupon: '',
      upload_photo: '',
    }
    return sleep(444)
      .then(() => {
        this.props.initialize(data)
      })
  }

  handlerSubmit(values) {
    console.log('valueeeees', values.upload_photo[0])
    const token = this.props.facebook_token
    const options = {
      name: `${values.firstName} ${values.lastName}`,
      email: values.email,
    }

    if (this.props.login_method === 'facebook') {
      options.facebook_auth_code = token
    } else if (this.props.login_method === 'accountKit') {
      options.account_kit_access_token = token
    } else if (values.coupon.length > 2) {
      options.coupon_code = values.coupon
    }

    const imageFile = {
      Avatar_image: values.upload_photo[0],
    }

    this.props.registration(options, imageFile)
  }
  renderFileInput = props => (
    <input name='upload_photo' type='file'
      onChange={(event) => {
        props.input.onChange(event)
        const reader = new FileReader()
        const files = event.target.files[0]
        reader.onloadend = () => {
          this.props.refreshPhoto(files.name, reader.result)
        }
        reader.readAsDataURL(files)
      }}
    />
  )

  render() {
    console.log('this.props ----->', this.props)
    return (
      <div className='settings settings-general' >
        <div className='container' >
          <form onSubmit={this.props.handleSubmit(this.handlerSubmit)}
            className='settings-general-flex settings-general-setup'
          >
            <div className='settings-general-left' >
              <div className='upload-photo' >
                <img src={this.props.photo.url} alt='' />
                <Field name='upload_photo'
                  component={this.renderFileInput}
                />
              </div>
              <div className='upload-photo-caption' >
                {this.props.photo.name}
              </div>
            </div>
            <div className='settings-general-right' >
              <div className='form-wrapper' >
                <h2 className='settings-header' >Account</h2>
                <Field name='firstName' type='text' component={renderInput} label='First Name' />
                <Field name='lastName' type='text' component={renderInput} label='Last Name' />
                <Field name='email' type='email' component={renderInput} label='Email' />
                <Field name='coupon' type='text' component={renderInput} label='coupon' />
                <span className='error' >{this.props.error_register}</span>
              </div>
              <div className='form-wrapper' >
                <h2 className='settings-header' >Children</h2>
                <div className='input-group' >
                  <a className='add-media' >+</a>
                </div>
                <input type='submit' className='btn btn-got-it start-question-btn'
                  value='Start question'
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    login_method: state.auth.login_method,
    user: state.auth.form_data,
    photo: state.auth.photo,
    facebook_token: state.auth.facebook_token,
    error_register: state.auth.error_register,
  }),
  { registration, refreshPhoto, editAccountInfo },
)(reduxForm({
  form: 'register',
  validate,
})(RegisterView))
