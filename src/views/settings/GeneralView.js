import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { renderInput } from '../../components/ui/input'
import { renderTimeZoneSelect, renderCountrySelect } from '../../components/ui/select'
import { refreshPhoto } from '../../actions/auth'
import { normalizePostalCode } from '../../validators/profile'
import { editAccountInfo } from '../../actions/profile'

class General extends Component {
  static propTypes = {
    photo: PropTypes.object,
    refreshPhoto: PropTypes.func,
    editAccountInfo: PropTypes.func,
    error_message: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.handlerSubmit = this.handlerSubmit.bind(this)
  }

  componentDidMount() {
    // const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
    // const value = this.props.user
    // const data = {
    //   firstName: value.first_name,
    //   lastName: value.last_name,
    //   email: value.email,
    //   coupon: '',
    //   upload_photo: '',
    // }
    // return sleep(444)
    //   .then(() => {
    //     this.props.initialize(data)
    //   })
  }

  handlerSubmit(values) {
    // const options = {
    //   avatar_image: values.file[0],
    //   timezone: values.timezone,
    // }
    console.log('values', values)
    this.props.editAccountInfo(values)
  }

  renderFileInput = props => (
    <input type='file'
      onChange={(event) => {
        console.log('props', props.input.value)
        console.log('event', event)
        const reader = new FileReader()
        const file = event.target.files[0]
        reader.readAsDataURL(file)
        props.input.onChange(event.target.files)
        if (window.FileReader) {
          reader.onloadend = () => {
            this.props.refreshPhoto(file.name, reader.result)
          }
        }
      }}
    />
  )

  render() {
    return (
      <div className='settings settings-general' >
        <div className='container' >
          <form encType='multipart/form-data'
            onSubmit={this.props.handleSubmit(this.handlerSubmit)}
          >
            <div className='settings-general-flex' >

              <div className='settings-general-left' >
                <div className='upload-photo' >
                  <img src={this.props.photo.url} alt='' />

                  <Field name='file' component={this.renderFileInput} />
                </div>
                <div className='upload-photo-caption' >{this.props.photo.name}</div>
              </div>
              <div className='settings-general-right' >
                <div className='form-wrapper' >
                  <h2 className='settings-header' >Account</h2>
                  <Field name='timezone' component={renderTimeZoneSelect} />
                  <fieldset>
                    <Field name='country_code_2char' component={renderCountrySelect} />
                  </fieldset>
                  <Field name='postal_code' label='Postal code / ZIP'
                    component={renderInput} normalize={normalizePostalCode}
                  />
                  <span className='error'>{this.props.error_message}</span>
                  <input type='submit' className='btn btn-green' value='Save account' />
                </div>
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
    user: state.auth.user_data,
    photo: state.auth.photo,
    error_message: state.information.error_message,
  }),
  { refreshPhoto, editAccountInfo },
)(reduxForm({
  form: 'settings',
})(General))
