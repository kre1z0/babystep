import React, { PropTypes } from 'react'
// Константы    ↓
import * as constants from '../../constants/basic'

export const WeekDays = props =>
  (
    <div className='week_days_block' >
      {
        props.weekdays.map(day =>
          (<div className='row' key={day} >
            <span className='vertical_align' >
              {day}
            </span>
          </div>),
        )
      }
    </div>
  )

WeekDays.propTypes = {
  weekdays: PropTypes.array,
}

export const Thead = () => {
  const cellsAM = Array.from({ length: constants.HOURS_PER_DAY / 2 }, (_, i) => {
    const index = i + 1
    return (<div className='cell' key={`${i}${'AM'}`} >{index}
      <span className='header_scale' >AM</span>
    </div>)
  })
  const cellsPM = Array.from({ length: constants.HOURS_PER_DAY / 2 }, (_, i) => {
    const index = i + 1
    return (<div className='cell' key={`${i}${'PM'}`} >{index}
      <span className='header_scale' >PM</span>
    </div>)
  })
  return (
    <div className='row availability_header' >
      <div className='cell' >
        <span className='header_scale' />
      </div>
      {cellsAM}
      {cellsPM}
    </div>
  )
}
