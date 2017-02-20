import React, { PropTypes, Component } from 'react'
// https://github.com/JedWatson/classnames
import classNames from 'classnames'
// https://github.com/dylang/shortid
import shortid from 'shortid'
// https://facebook.github.io/react/docs/animation.html
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'

// Константы    ↓
import * as constants from '../../constants/basic'
import { getAllSchedulesFromExpertId, togglePopup,
  editSchedule, deleteSchedule, createNewSchedule } from '../../actions/expert/availability'
import { Thead, WeekDays } from '../../components/availability/pure'
import Cells from '../../components/availability/Cells'
import Schedule from '../../components/availability/Schedule'
import Popup from '../../components/availability/Popup'

class Availability extends Component {
  static propTypes = {
    actions: PropTypes.object,
    schedules: PropTypes.array,
    popup: PropTypes.object,
  }
  constructor(props) {
    super(props)
    this.onClickDeleteAllSchedules = this.onClickDeleteAllSchedules.bind(this)
    this.onClickCreateNewSchedule = this.onClickCreateNewSchedule.bind(this)
    this.onClickSchedule = this.onClickSchedule.bind(this)
    this.state = {
      weekdays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    }
  }
  componentDidMount() {
    this.props.getAllSchedulesFromExpertId(this.props.expert.id)
  }
  onClickDeleteAllSchedules() {
    if (this.props.schedules.length > 0) {
      this.props.togglePopup(this.props.popup.isOpen, 'deleteAllSchedules')
    }
  }
  onClickCreateNewSchedule(schedule) {
    this.props.togglePopup(this.props.popup.isOpen, 'newSchedule')
    this.props.createNewSchedule(schedule)
    const component = this.popup
    component.setState({
      start_at: schedule.start_at,
      end_at: schedule.end_at,
      values: {
        min: schedule.values.min,
        max: schedule.values.max,
      },
    })
  }
  onClickSchedule(item) {
    console.log('item +++++', item)
    this.props.togglePopup(this.props.popup.isOpen, 'editingSchedule')
    this.props.editSchedule(item)
    const component = this.popup
    component.setState({
      start_at: item.start_at,
      end_at: item.end_at,
      values: {
        min: item.values.min,
        max: item.values.max,
      },
    })
  }
  render() {
    console.log('ava', this.props)
    const buttonClass = classNames('btn_delete_all',
      { disabled: this.props.schedules.length === 0 })
    return (
      <DocumentTitle title='Availability' >
        <div className='table_time_wrapper' >
          <div className='TableWidget' >
            <div className='timetable_header' >
              <h1>You what time for call?</h1>
              <button onClick={this.onClickDeleteAllSchedules}
                className={buttonClass} type='button'
              >
                Delete all
              </button>
              <div className='timetable_header-sub' >
                <h4>You will be available 140 hours</h4>
                <span className='error' >{this.props.error}</span>
              </div>
            </div>
            <div className='time_table_body' >
              <WeekDays weekdays={this.state.weekdays} />
              <div className='table-flex' >
                <Thead />
                {
                  this.state.weekdays.map((day) => {
                    const schedule = []
                    this.props.schedules.forEach((item) => {
                      if (item.weekDay === day) {
                        schedule.push(
                          <Schedule
                            onClickSchedule={this.onClickSchedule}
                            key={item.id}
                            schedules={this.props.schedules}
                            schedule={item}
                          />,
                        )
                      }
                    })
                    const cells = Array.from({ length: constants.HOURS_PER_DAY }, (_, i) => <Cells
                      onClickCreateNewSchedule={this.onClickCreateNewSchedule}
                      actions={this.props}
                      schedules={this.props.schedules}
                      key={shortid.generate()}
                      day={day}
                      hour={i + 1}
                    />)
                    return (
                      <div key={day} >
                        <div className='mobile_week_day' key={`${day} mobile`} >
                          <span className='line' >
                            {day}
                          </span>
                        </div>
                        <div className='row' >
                          <div className='cell' />
                          {cells}
                          <ReactCSSTransitionGroup
                            transitionName='example'
                            transitionEnterTimeout={1000}
                            transitionLeaveTimeout={1000}
                          >
                            {schedule}
                          </ReactCSSTransitionGroup>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <Popup ref={(c) => { this.popup = c }} {...this.props} />
          </div>
        </div>
      </DocumentTitle>
    )
  }
}

export default connect(
  state => ({
    expert: state.auth.user_data,
    error: state.availability.message,
    schedules: state.availability.schedules,
    schedule: state.availability.schedule,
    weekdays: state.availability.weekdays,
    popup: state.availability.popup,
  }),
  { getAllSchedulesFromExpertId,
    togglePopup,
    editSchedule,
    deleteSchedule,
    createNewSchedule },
)(Availability)

