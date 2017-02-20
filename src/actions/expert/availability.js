// http://momentjs.com/
import moment from 'moment'
import http from '../../utils/http'
import * as constants from '../../constants/basic'

export const GET_ALL_SCHEDULES = 'GET_ALL_SCHEDULES'
export const DELETE_ALL_SCHEDULES = 'DELETE_ALL_SCHEDULES'
export const TOGGLE_AVAILABILITY_POPUP = 'TOGGLE_AVAILABILITY_POPUP'
export const CREATE_NEW_SCHEDULE = 'CREATE_NEW_SCHEDULE'
export const DELETE_SCHEDULE = 'DELETE_SCHEDULE'
export const DELETE_SCHEDULE_SUCCESS = 'DELETE_SCHEDULE_SUCCESS'
export const EDIT_SCHEDULE = 'EDIT_SCHEDULE'
export const SAVE_SCHEDULE = 'SAVE_SCHEDULE'

export const GREEN_TIME_ERROR = 'GREEN_TIME_ERROR'

// Принимает дату начального времени и конечного →
// отдает минимальное и максимальное значение ползунка
// 1 шаг слайдера → 30 минут → start,end строка
function getInputRange(start, end) {
  const maxInput = ((moment(end) - moment(start).startOf('day')) / constants.HALF_HOUR)
  const valueBeforeStart = (moment(end) - moment(start)) / constants.HALF_HOUR
  const minInput = maxInput - valueBeforeStart
  return {
    min: minInput,
    max: maxInput,
  }
}

function deleteAllScheduleFromServer(deleted) {
  console.log('deleteAllScheduleFromServer ---->', deleted)
  const url = 'server'
  fetch(url, {
    method: 'post',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body: 'foo=bar&lorem=ipsum',
  })
    .then(response => response.json())
    .then((data) => {
      console.log('Request succeeded with JSON response', data)
    })
    .catch((error) => {
      console.log('Request failed', error)
    })
}

function deleteScheduleFromServer(id) {
  console.log('deleteScheduleFromServer ---->', id)
  const url = 'server'
  fetch(url, {
    method: 'post',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body: 'foo=bar&lorem=ipsum',
  })
    .then(response => response.json())
    .then((data) => {
      console.log('Request succeeded with JSON response', data)
    })
    .catch((error) => {
      console.log('Request failed', error)
    })
}

function fetchNewSchedule(schedule) {
  const url = 'server'
  const startOftheDay = moment().utc().isoWeekday(schedule.weekDay).startOf('day')
  const start = startOftheDay.add(schedule.values.min * 30, 'minutes').format()
  const end = startOftheDay.add((schedule.values.max * 30) - schedule.values.min * 30, 'minutes').format()
  const id = schedule.id
  console.log('fetchNewSchedule start_at ---->', start)
  console.log('fetchNewSchedule end_at ---->', end)
  console.log('fetchNewSchedule id ---->', id)
  fetch(url, {
    method: 'post',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body: 'foo=bar&lorem=ipsum',
  })
    .then(response => response.json())
    .then((data) => {
      console.log('Request succeeded with JSON response', data)
    })
    .catch((error) => {
      console.log('Request failed', error)
    })
}

function fetchEditscheduleFromServer(schedule) {
  const id = schedule.id
  const start = schedule.start_at
  const end = schedule.end_at
  console.log('fetchEditscheduleFromServer', schedule, id, start, end)
}

// валидация для нового рассписания
// принимает массив schedules(рассписаний)
// ↓ отдает объект из начального и конечного значения schedules ↓
export const getInputValuesForNew = (schedules, weekDay, index) => {
  const array = []
  schedules.forEach((item) => {
    if (item.weekDay === weekDay) {
      array.push(item.values.min, item.values.max)
    }
  })
  array.sort((a, b) => a - b)
  const getMin =
    min =>
      (acc, val) =>
        val < acc && val > min
          ? val
          : acc
  const getMax =
    min =>
      (acc, val) =>
        val > acc && val < min
          ? val
          : acc

  const valueMin = array.reduce(getMax(index), constants.INPUT_RANGE_MIN_VALUE)
  const valueMax = array.reduce(getMin(index), constants.INPUT_RANGE_MAX_VALUE)
  const values = {
    min: valueMin,
    max: valueMax,
  }
  return values
}

// валидация для редактирования рассписания
// ↓ отдает объект из начального и конечного значения schedules ↓
export const getInputValuesForEdit = (schedules, weekDay, id, minValue, maxValue) => {
  const array = []
  schedules.forEach((item) => {
    if (item.weekDay === weekDay && item.id !== id) {
      array.push(item.values.min, item.values.max)
    }
  })
  if (schedules.length === 1) {
    return {
      min: 0,
      max: 48,
    }
  }
  const getMin =
    min =>
      (acc, val) =>
        val < acc && val > min || val === min
          ? val
          : acc
  const getMax =
    max =>
      (acc, val) =>
        val > acc && val < max || val === max
          ? val
          : acc

  const valueMin = array.reduce(getMax(minValue), constants.INPUT_RANGE_MIN_VALUE)
  const valueMax = array.reduce(getMin(maxValue), constants.INPUT_RANGE_MAX_VALUE)
  // console.log('array', array)
  // console.log('valueMinF', valueMin)
  // console.log('valueMaxF', valueMax)

  const values = {
    min: valueMin,
    max: valueMax,
  }
  return values
}

// Принимает значение ползунка min + max
// Отдает стиль width и left для schedule
export function getScheduleStyle(object) {
  const cellWidth = 100 / 24 / 2
  const max = object.max
  const min = object.min
  const widthSchedule = (max - min) * cellWidth
  const leftSchedule = cellWidth * min
  return {
    scheduleWidth: `${widthSchedule}%`,
    scheduleLeft: `${leftSchedule}%`,
  }
}

const actions = {
  getAllSchedulesFromServer: () => (dispatch) => {
    const url = '../static/json/schedules.json'
    fetch(url)
      .then(response => response.json())
      .then((schedules) => {
        const array = []
        schedules.forEach((item) => {
          const itemId = item.id
          const values = getInputRange(item.start_at, item.end_at)
          const schedulesStyle = getScheduleStyle(values)
          const schedule = {
            id: itemId,
            serverTime: {
              start: item.start_at,
              end: item.end_at,
            },
            start_at: moment(item.start_at).format(constants.FORMAT_DATES),
            end_at: moment(item.end_at).format(constants.FORMAT_DATES),
            weekDay: moment(item.start_at).format('dddd'),
            values,
            schedulesStyle,
          }
          array.push(schedule)
        })
        dispatch(
          {
            type: GET_ALL_SCHEDULES,
            schedules: array,
          },
        )
      }).catch((error) => {
        console.log('parsing failed', error)
      })
  },
  togglePopup: (popup, act) => ({
    type: TOGGLE_AVAILABILITY_POPUP,
    popup: {
      isOpen: !popup,
      action: act,
    },
  }),
  editSchedule: item => ({
    type: EDIT_SCHEDULE,
    schedule: item,
  }),
  saveSchedule: newArray => ({
    type: SAVE_SCHEDULE,
    schedules: newArray,
  }),
  deleteAllSchedules: () => ({
    type: DELETE_ALL_SCHEDULES,
    schedules: [],
  }),
}

export function getAllSchedulesFromExpertId(id) {
  return (dispatch) => {
    http.get(`experts/${id}/green-time`).then((result) => {
      console.log('getExpertGreenTime ---->', result)
      const schedules = result.content
      const array = []
      schedules.forEach((item) => {
        const itemId = item.id
        const values = getInputRange(item.start_at, item.end_at)
        const schedulesStyle = getScheduleStyle(values)
        const schedule = {
          id: itemId,
          serverTime: {
            start: item.start_at,
            end: item.end_at,
          },
          start_at: moment(item.start_at).format(constants.FORMAT_DATES),
          end_at: moment(item.end_at).format(constants.FORMAT_DATES),
          weekDay: moment(item.start_at).format('dddd'),
          values,
          schedulesStyle,
        }
        array.push(schedule)
      })
      dispatch(
        {
          type: GET_ALL_SCHEDULES,
          schedules: array,
        },
      )
    }).catch((error) => {
      console.log('error info', error)
      dispatch({
        type: INFORMATION_ERROR,
        message: error.error_message,
      })
    })
  }
}

export function togglePopup(popup, act) {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_AVAILABILITY_POPUP,
      popup: {
        isOpen: !popup,
        action: act,
      },
    })
  }
}

export function editSchedule(item) {
  return (dispatch) => {
    dispatch({
      type: EDIT_SCHEDULE,
      schedule: item,
    })
  }
}

export function deleteSchedule(newArray, id) {
  return (dispatch) => {
    dispatch({
      type: DELETE_SCHEDULE,
      schedules: newArray,
    })
    http.delete(`experts/green-time/${id}`).then((result) => {
      console.log('deleteSchedule --- >', result)
      dispatch({
        type: DELETE_SCHEDULE_SUCCESS,
      })
    }).catch((error) => {
      dispatch({
        type: GREEN_TIME_ERROR,
        message: error.error_message,
      })
    })
  }
}

export function createNewSchedule(newSchedule) {
  return (dispatch) => {
    dispatch({
      type: CREATE_NEW_SCHEDULE,
      schedule: newSchedule,
    })
  }
}