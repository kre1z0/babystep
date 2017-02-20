import http from '../utils/http'

export function editAccountInfo() {
  return (dispatch) => {
    http.post('account/me').then((result) => {
      console.log('getinfo', result)
      dispatch({
        type: 'edit',
        user_data: result,
      })
    }).catch((error) => {
      console.log('error info', error)
      dispatch({
        type: 'error',
      })
    })
  }
}
