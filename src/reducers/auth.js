import * as actions from '../actions/auth'

const facebookToken = localStorage.getItem('facebook_token')
const apiToken = localStorage.getItem('token')

const InitialAuthState = {
  facebook_token: facebookToken,
  token: apiToken,
  user_data: {
    photos: {
      photo_small_url: 'http://www.colorcombos.com/images/colors/hex/FFFFFF.png',
      photo_normal_url: '',
    },
  },
  form_data: {},
  photo: {
    name: 'Upload photo',
    url: '',
  },
  wait_mode: false,
  error_message: '',
  error_register: '',
}

const auth = (state = InitialAuthState, action) => {
  switch (action.type) {
    case actions.LOGIN_REQUEST:
      return {
        ...state,
        wait_mode: action.wait_mode,
      }
    case actions.SELECT_LOGIN_METHOD:
      return {
        ...state,
        login_method: action.login_method,
        facebook_token: action.facebook_token,
      }
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
      }
    case actions.LOGIN_ERROR:
      return {
        ...state,
        error_message: action.error_message,
        wait_mode: action.wait_mode,
      }
    case actions.LOGIN_FAILURE:
      return {
        ...state,
        token: null,
        error_message: action.error_message,
      }
    case actions.LOGIN_CALLBACK:
      return {
        ...state,
        wait_mode: action.wait_mode,
      }
    case actions.REGISTER:
      return {
        ...state,
        form_data: action.form_data,
      }
    case actions.REFRESH_PHOTO:
      return {
        ...state,
        photo: action.photo,
      }
    case actions.REGISTRATION_ERROR:
      return {
        ...state,
        error_register: action.error_register,
      }
    case actions.REFRESH_USER_DATA:
      return {
        ...state,
        user_data: action.user_data,
      }
    case actions.LOGOUT_SUCCESS:
      return {
        ...state,
        token: action.token,
        wait_mode: action.wait_mode,
        error_message: action.error_message,
      }
    default:
      return state
  }
}

export default auth
