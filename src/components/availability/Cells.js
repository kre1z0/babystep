import React, { Component, PropTypes } from 'react'
// http://momentjs.com/
import moment from 'moment'
// Actions     ↓
import * as actions from '../../actions/expert/availability'
// Константы    ↓
import * as constants from '../../constants/basic'

class Cells extends Component {
  static propTypes = {
    schedules: PropTypes.array,
    day: PropTypes.string,
    onClickCreateNewSchedule: PropTypes.func,
    hour: PropTypes.number,
  }
  constructor(props) {
    super(props)
    this.onClickCreateNewSchedule = this.onClickCreateNewSchedule.bind(this)
  }
  onClickCreateNewSchedule() {
    const inputRange = this.props.hour * constants.INPUT_RANGE
    const schedules = this.props.schedules
    const validationValues = actions.getInputValuesForNew(schedules, this.props.day, inputRange)
    const start = moment(inputRange * constants.HALF_HOUR)
    const end = moment(validationValues.max * constants.HALF_HOUR)
    const startTime = start.utc().format(constants.FORMAT_DATES)
    const endTime = end.utc().format(constants.FORMAT_DATES)

    const schedule = {
      weekDay: this.props.day,
      start_at: startTime,
      end_at: endTime,
      validationValues,
      values: {
        min: inputRange,
        max: validationValues.max,
      },
    }
    // console.log('schedule', schedule)
    this.props.onClickCreateNewSchedule(schedule)
  }
  render() {
    return (
      <div className='cell' onClick={this.onClickCreateNewSchedule} >
        <span className='circle' />
      </div>
    )
  }
}

export default Cells
