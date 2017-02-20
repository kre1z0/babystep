import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class StartQuestionView extends Component {
  static propTypes = {
    twitch: PropTypes.array,
  }
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
  }
  render() {
    return (
      <h1>StartQuestionsView</h1>
    )
  }
}

export default connect(
  state => ({
  }),
  { },
)(StartQuestionView)
