import { push } from 'react-router-redux'
import http from '../utils/http'
import { editAccountInfo } from './profile'

export const LOGIN = 'LOGIN'
export const REFRESH_USER_DATA = 'REFRESH_USER_DATA'
export const REGISTRATION = 'REGISTRATION'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const SELECT_LOGIN_METHOD = 'SELECT_LOGIN_METHOD'
export const LOGIN_CALLBACK = 'LOGIN_CALLBACK'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const REGISTER = 'REGISTER'
export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST'
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS'
export const REGISTRATION_ERROR = 'REGISTRATION_ERROR'

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

export const REGISTER_NEXT_STEP = 'REGISTER_NEXT_STEP'

export const REFRESH_PHOTO = 'REFRESH_PHOTO'

export function getAccountInfo() {
  return (dispatch) => {
    http.get('account/me').then((result) => {
      console.log('result', result)
      dispatch({
        type: REFRESH_USER_DATA,
        user_data: result.content,
      })
      dispatch({
        type: REFRESH_PHOTO,
        photo: {
          name: 'Upload photo',
          url: result.content.photos.photo_normal_url,
        },
      })
    }).catch((error) => {
      console.log('error info', error)
      dispatch({
        type: 'error',
      })
    })
  }
}

// ➡ Facebook login
export function facebookLogin() {
  return (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
      wait_mode: true,
    })
    window.FB.login((res) => {
      if (res.status === 'connected') {
        console.log('фейсбук логин', res)
        localStorage.setItem('facebook_token', res.authResponse.accessToken)
        dispatch({
          type: SELECT_LOGIN_METHOD,
          login_method: 'facebook',
          facebook_token: res.authResponse.accessToken,
        })
        http.get(`account/facebook/login?facebook_auth_code=${res.authResponse.accessToken}`)
          .then((result) => {
            localStorage.setItem('token', result.content.access_token)
            dispatch(getAccountInfo())
            dispatch({
              type: LOGIN_SUCCESS,
              token: result.content.access_token,
            })
            dispatch(push('/'))
          }).catch((errors) => {
            console.log('error', errors)
            dispatch({
              type: LOGIN_ERROR,
              error_message: errors.error_message,
              wait_mode: false,
            })
            if (errors.error_code === 'SIGN_UP_REQUIRED') {
              window.FB.api('/me',
                { fields: 'first_name, last_name, email, picture.type(large)' },
                (response) => {
                  console.log('response', response)
                  console.log(response.first_name)
                  console.log(response.last_name)
                  console.log(response.email)
                  console.log(response.picture)
                  dispatch({
                    type: REGISTER,
                    form_data: {
                      first_name: response.first_name,
                      last_name: response.last_name,
                      email: response.email,
                    },
                  })
                  dispatch({
                    type: REFRESH_PHOTO,
                    photo: {
                      name: response.first_name,
                      url: response.picture.data.url,
                    },
                  })
                },
              )
              console.log('есть токен го на регу', errors.error_code)
              dispatch(push('/learn'))
            }
          })
      } else {
        dispatch({
          type: LOGIN_FAILURE,
        })
        dispatch({
          type: LOGIN_CALLBACK,
          wait_mode: false,
        })
      }
    }, { scope: 'email, user_likes' })
  }
}

// ➡ AccountKit login
export function accountKitLogin(mode, options) {
  return (dispatch) => {
    console.log('accountKitLogin', mode, options)
    dispatch({
      type: LOGIN_REQUEST,
    })
    window.AccountKit.login(mode, options,
      (response) => {
        console.log('accountKitLogin', response)
        if (response.status === 'PARTIALLY_AUTHENTICATED') {
          console.log('токен аккаунткита', response.code)
          dispatch({
            type: SELECT_LOGIN_METHOD,
            login_method: 'accountKit',
            facebook_token: response.code,
          })
          localStorage.setItem('facebook_token', response.code)
          http.get(`account/accountkit/login?accountkit_auth_code=${response.code}`)
            .then((result) => {
              localStorage.setItem('token', result.content.access_token)
              console.log('RESULTAT', result)
              dispatch({
                type: LOGIN_SUCCESS,
                token: result.token,
              })
            }).catch((errors) => {
              console.log('error', errors)
              dispatch({
                type: LOGIN_ERROR,
                error_message: errors.error_message,
              })
              if (errors.error_code === 'SIGN_UP_REQUIRED') {
                console.log('есть токен го на регу', errors.error_code)
                dispatch({
                  type: REGISTER,
                  form_data: {
                    email: options.emailAddress,
                  },
                })
                dispatch(push('/learn'))
              }
            })
        } else {
          dispatch({
            type: LOGIN_FAILURE,
            error_message: 'Authentication failure',
          })
          if (response.status === 'NOT_AUTHENTICATED') {
            // handle authentication failure
            console.log('Authentication failure')
          } else if (response.status === 'BAD_PARAMS') {
            // handle bad parameters
            console.log('Bad parameters')
          }
          console.log(response)
          dispatch({
            type: LOGIN_CALLBACK,
            wait_mode: false,
          })
        }
      },
    )
  }
}

export function logOut() {
  window.FB.logout()
  return (dispatch) => {
    localStorage.removeItem('token')
    dispatch({
      type: LOGOUT_SUCCESS,
      wait_mode: false,
      token: null,
      error_message: '',
    })
    dispatch({
      type: REFRESH_USER_DATA,
      user_data: {
        photos: {
          photo_small_url: 'http://www.colorcombos.com/images/colors/hex/FFFFFF.png',
        },
      },
    })
    dispatch(push('/login'))
  }
}

export function registration(options, imageFile) {
  console.log('parameters --->', options)
  return (dispatch) => {
    dispatch({
      type: REGISTRATION_REQUEST,
    })
    http.post('account/signup/parent', options)
      .then((result) => {
        localStorage.setItem('token', result.content.access_token)
        dispatch({
          type: REGISTRATION_SUCCESS,
        })
      }).then(() => {
        dispatch(editAccountInfo(imageFile))
      }).then(() => {
        dispatch(editAccountInfo(imageFile))
      })
      .then(() => {
        dispatch(getAccountInfo())
        dispatch(push('/'))
      })
      .catch((error) => {
        console.log('error', error)
        dispatch({
          type: REGISTRATION_ERROR,
          error_register: error.error_message,
        })
      })
  }
}

export function logIn(token) {
  console.log('token', token)
  return (dispatch) => {
    if (token === null) {
      dispatch({ type: LOGIN })
      dispatch(push('/login'))
    } else {
      dispatch(getAccountInfo())
    }
  }
}

export function refreshPhoto(fileName, imagePreviewUrl) {
  return (dispatch) => {
    dispatch({
      type: REFRESH_PHOTO,
      photo: {
        name: fileName,
        url: imagePreviewUrl,
      },
    })
  }
}
