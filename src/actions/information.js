import http from '../utils/http'

export const GET_ALL_EXPERTS = 'GET_ALL_EXPERTS'
export const GET_EXPERT_BY_ID = 'GET_EXPERT_BY_ID'
export const GET_EXPERT_BALANCE = 'GET_EXPERT_BALANCE'
export const GET_ALL_EXPERTS_PRODUCTS = 'GET_ALL_EXPERTS_PRODUCTS'
export const GET_EXPERT_PRODUCTS = 'GET_EXPERT_PRODUCTS'
export const GET_EXPERT_GREENTIME = 'GET_EXPERT_GREENTIME'

export const INFORMATION_ERROR = 'INFORMATION_ERROR'

export function getAllExperts() {
  return (dispatch) => {
    http.get('experts').then((result) => {
      dispatch({
        type: GET_ALL_EXPERTS,
        experts: result.content,
      })
    }).catch((error) => {
      console.log('error info', error)
      dispatch({
        type: INFORMATION_ERROR,
        message: error.error_message,
      })
    })
  }
}

export function getExpertById(id) {
  return (dispatch) => {
    http.get(`experts/${id}`).then((result) => {
      console.log('getExpertById ---->', result)
      dispatch({
        type: GET_EXPERT_BY_ID,
        expert: result.content,
      })
    }).catch((error) => {
      console.log('error info', error)
      dispatch({
        type: INFORMATION_ERROR,
        message: error.error_message,
      })
    })
  }
}

export function getExpertBalance() {
  return (dispatch) => {
    http.get('experts/me/balance').then((result) => {
      dispatch({
        type: GET_EXPERT_BALANCE,
        balance: result.content,
      })
    }).catch((error) => {
      console.log('error info', error)
      dispatch({
        type: INFORMATION_ERROR,
        message: error.error_message,
      })
    })
  }
}

export function getAllExpertsProducts() {
  return (dispatch) => {
    http.get('experts/products').then((result) => {
      console.log('getAllExpertsProducts ---->', result)
      dispatch({
        type: GET_ALL_EXPERTS_PRODUCTS,
        experts_products: result.content,
      })
    }).catch((error) => {
      console.log('error info', error)
      dispatch({
        type: INFORMATION_ERROR,
        message: error.error_message,
      })
    })
  }
}

export function getExpertProductsById(id) {
  return (dispatch) => {
    http.get(`experts/products?expert_id=${id}`).then((result) => {
      console.log('getExpertProductsById ---->', result)
      dispatch({
        type: GET_EXPERT_PRODUCTS,
        expert_products: result.content,
      })
    }).catch((error) => {
      console.log('error info', error)
      dispatch({
        type: INFORMATION_ERROR,
        message: error.error_message,
      })
    })
  }
}

export function getExpertGreenTime(id) {
  return (dispatch) => {
    http.get(`experts/${id}/green-time`).then((result) => {
      console.log('getExpertGreenTime ---->', result)
      dispatch({
        type: GET_EXPERT_GREENTIME,
        schedule: result,
      })
    }).catch((error) => {
      console.log('error info', error)
      dispatch({
        type: INFORMATION_ERROR,
        message: error.error_message,
      })
    })
  }
}

export function addGreenTime(parameters) {
  return (dispatch) => {
    http.post('experts/green-time', parameters).then((result) => {
      console.log('addGreenTime ---->', result)
      dispatch({
        type: GET_EXPERT_GREENTIME,
        schedule: result,
      })
    }).catch((error) => {
      console.log('error info', error)
      dispatch({
        type: INFORMATION_ERROR,
        message: error.error_message,
      })
    })
  }
}
