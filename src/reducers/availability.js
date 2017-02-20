// actions   ↓
import * as actions from '../actions/expert/availability'

const initialAvailabilityState = {
  schedules: [],
  popup: {
    isOpen: false,
    action: '',
  },
  schedule: {
    end_at: '',
    id: 0,
    start_at: '',
    validationValues: {
      min: 0,
      max: 48,
    },
  },
}

const availability = (state = initialAvailabilityState, action) => {
  switch (action.type) {
    case actions.GET_ALL_SCHEDULES:
      return {
        ...state,
        schedules: action.schedules,
      }
    case actions.DELETE_SCHEDULE:
      return {
        ...state,
        schedules: action.schedules,
      }
    case actions.CREATE_NEW_SCHEDULE:
      return {
        ...state,
        schedule: action.schedule,
      }
    case actions.EDIT_SCHEDULE:
      return {
        ...state,
        schedule: action.schedule,
      }
    case actions.SAVE_SCHEDULE:
      return {
        ...state,
        schedules: action.schedules,
      }
    case actions.TOGGLE_AVAILABILITY_POPUP:
      return {
        ...state,
        popup: action.popup,
      }
    case actions.DELETE_ALL_SCHEDULES:
      return {
        ...state,
        schedules: action.schedules,
      }
    case actions.GREEN_TIME_ERROR:
      return {
        ...state,
        message: action.message,
      }
    default:
      return state
  }
}

export default availability
