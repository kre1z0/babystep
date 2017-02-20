import React, { Component, PropTypes } from 'react'
// https://github.com/dylang/shortid
import shortid from 'shortid'
// http://momentjs.com/
import moment from 'moment'
// https://github.com/davidchin/react-input-range
import InputRange from 'react-input-range'
// https://github.com/JedWatson/classnames
import classNames from 'classnames'
// Константы    ↓
import * as constants from '../../constants/basic'
// Actions     ↓
import * as actions from '../../actions/expert/availability'

class Popup extends Component {
  static propTypes = {
    availability: PropTypes.object,
  }
  constructor(props) {
    super(props)
    this.onEscKeyDown = this.onEscKeyDown.bind(this)
    this.onClickClosePopup = this.onClickClosePopup.bind(this)
    this.onClickDeleteSchedule = this.onClickDeleteSchedule.bind(this)
    this.onChangeValues = ::this.onChangeValues
    this.onClickSaveSchedule = this.onClickSaveSchedule.bind(this)
    this.onClickDeleteAllSchedules = this.onClickDeleteAllSchedules.bind(this)
    this.state = {
      end_at: '',
      start_at: '',
      values: {
        min: 0,
        max: 48,
      },
    }
  }
  componentDidMount() {
    document.addEventListener('keydown', this.onEscKeyDown)
  }
  onClickDeleteSchedule() {
    const props = this.props

    const newSchedulesArray = props.schedules.filter(obj => obj.id !== props.schedule.id)
    this.props.deleteSchedule(newSchedulesArray, props.schedule.id)
    this.onClickClosePopup()
  }

  onClickClosePopup() {
    this.props.togglePopup(true, '')
  }

  onClickDeleteAllSchedules() {
    this.onClickClosePopup()
    this.props.deleteAllSchedules()
  }

  onChangeValues(component, handleValues) {
    const start = moment(handleValues.min * constants.HALF_HOUR).utc().format(constants.FORMAT_DATES)
    const end = moment(handleValues.max * constants.HALF_HOUR).utc().format(constants.FORMAT_DATES)
    this.setState({
      start_at: start,
      end_at: end,
      values: {
        min: handleValues.min,
        max: handleValues.max,
      },
    })
  }

  onEscKeyDown(e) {
    const ESC = 27
    if (e.keyCode === ESC) {
      this.onClickClosePopup()
    }
  }

  onClickSaveSchedule() {
    const state = this.state
    const props = this.props

    if (props.popup.action === 'editingSchedule') {
      console.log('onClickSaveSchedule', props)
      const prewStateArray = props.schedules.filter(obj => obj.id !== props.schedule.id)
      const copyArray = prewStateArray.slice()
      const object = this.state.values
      const schedulesStyle = actions.getScheduleStyle(object)
      const schedule = {
        id: props.schedule.id,
        weekDay: props.schedule.weekDay,
        start_at: state.start_at,
        end_at: state.end_at,
        // serverTime: {
        //   start: props.schedule.serverTime.start,
        //   end: props.schedule.serverTime.end,
        // },
        values: {
          min: state.values.min,
          max: state.values.max,
        },
        schedulesStyle,
      }
      copyArray.push(schedule)
      this.props.saveSchedule(copyArray)
    }
    if (props.popup.action === 'newSchedule') {
      const copyArray = props.schedules.slice()
      const object = this.state.values
      const schedulesStyle = actions.getScheduleStyle(object)
      const schedule = {
        id: shortid.generate(),
        weekDay: props.schedule.weekDay,
        start_at: state.start_at,
        end_at: state.end_at,
        // serverTime: {
        //   start: props.schedule.serverTime.start,
        //   end: props.schedule.serverTime.end,
        // },
        values: {
          min: state.values.min,
          max: state.values.max,
        },
        schedulesStyle,
      }
      copyArray.push(schedule)
      this.props.saveSchedule(copyArray)
    }
    this.onClickClosePopup()
  }

  render() {
    console.log('this.props', this.props)
    const props = this.props
    const state = this.state
    const popUpClass = classNames('popup', { popup__opened: props.popup.isOpen })
    let deleteAll
    let newSchedule
    let editSchedule
    let invisibleForm = 'visible'
    const styleWidth = {
      width: '50%',
    }
    if (props.popup.action === 'deleteAllSchedules') {
      invisibleForm = 'invisible'
      deleteAll = (
        <div className='popup_buttons_container' >
          <p className='are_you_sure' >
            Are you sure want to delete all schedules?
          </p>
          <button onClick={this.onClickDeleteAllSchedules} type='button' className='button popup__button delete_all' >
            Delete
          </button>
        </div>
      )
    }
    if (props.popup.action === 'newSchedule') {
      newSchedule = (
        <div>
          <div className='popup_buttons_container' >
            <button onClick={this.onClickSaveSchedule} type='button' className='button popup__button save' >
              Save
            </button>
          </div>
        </div>)
    }
    if (props.popup.action === 'editingSchedule') {
      editSchedule = (<div>
        <div className='popup_buttons_container' >
          <button style={styleWidth} onClick={this.onClickDeleteSchedule}
            type='button' className='button popup__button delete'
          >
            Delete
          </button>
          <button style={styleWidth} onClick={this.onClickSaveSchedule}
            type='button' className='button popup__button save'
          >
            Save
          </button>
        </div>
      </div>)
    }
    return (
      <div>
        <div className={popUpClass} >
          <div className='popup__container' >
            <form className={`form ${invisibleForm}`} >
              <div className='formField' >
                <div className='formWeekday' >
                  {props.schedule.weekDay}
                </div>
                <div className='formHeader' >
                  {state.start_at}
                  &ensp;-&ensp;
                  {state.end_at}
                </div>
                <InputRange
                  onChange={this.onChangeValues}
                  minValue={props.schedule.validationValues.min}
                  maxValue={props.schedule.validationValues.max}
                  value={state.values}
                />
              </div>
            </form>
            {deleteAll}
            {newSchedule}
            {editSchedule}
            <button onClick={this.onClickClosePopup} className='button popup__close' >
              ×
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Popup
