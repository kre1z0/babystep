import * as actions from '../actions/information'
import { EDIT_PROFILE_ERROR, EDIT_PROFILE_SUCCESS } from '../actions/profile'

const InitialInformationState = {
  error_message: '',
}

const information = (state = InitialInformationState, action) => {
  switch (action.type) {
    case actions.GET_ALL_EXPERTS:
      return {
        ...state,
        experts: action.experts,
      }
    case actions.GET_EXPERT_BY_ID:
      return {
        ...state,
        expert: action.expert,
      }
    case actions.GET_EXPERT_BALANCE:
      return {
        ...state,
        balance: action.balance,
      }
    case actions.GET_ALL_EXPERTS_PRODUCTS:
      return {
        ...state,
        experts_products: action.experts_products,
      }
    case actions.GET_EXPERT_PRODUCTS:
      return {
        ...state,
        expert_products: action.expert_products,
      }
    case actions.GET_EXPERT_GREENTIME:
      return {
        ...state,
        schedule: action.schedule,
      }
    case actions.INFORMATION_ERROR:
      return {
        ...state,
        message: action.message,
      }
    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        error_message: action.message
      }
    case EDIT_PROFILE_ERROR:
      return {
        ...state,
        error_message: action.error_message,
      }
    default:
      return state
  }
}

export default information
