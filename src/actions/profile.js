import http from '../utils/http'
import { getAccountInfo } from './auth'

export const EDIT_PROFILE_REQUEST = 'EDIT_PROFILE_REQUEST'
export const EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS'
export const EDIT_PROFILE_ERROR = 'EDIT_PROFILE_ERROR'

export function editAccountInfo(parameters) {
  console.log('editAccountInfo action/profile.js', parameters)
  return (dispatch) => {
    dispatch({
      type: EDIT_PROFILE_REQUEST,
    })
    http.post('account/me', parameters).then((result) => {
      console.log('editAccountInfo result', result)
      dispatch({
        type: EDIT_PROFILE_SUCCESS,
        error_message: '',
      })
      dispatch(getAccountInfo())
    }).catch((error) => {
      console.log('error', error)
      dispatch({
        type: EDIT_PROFILE_ERROR,
        error_message: error.error_message,
      })
    })
  }
}
