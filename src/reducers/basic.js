import actions from '../constants/action-types'

const initialBasicState = {
  timezones: [],
  current_timezone: null,
}

export default function basic(state = initialBasicState, action) {
  switch (action.type) {
    case actions.SWITCH_TIMEZONE:
      return {
        ...state,
        timezone: action.timezone,
      }
    case actions.LOAD_TIMEZONES:
      return {
        ...state,
        timezones: action.timezones,
        current_timezone: action.current_timezone,
      }
    case actions.WAIT_MODE:
      return {
        ...state,
        wait_mode: action.value,
      }

    default:
      return state
  }
}