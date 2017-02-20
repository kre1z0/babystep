import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import actions from ''

const mapStateToProps = state => (
  {
    state: state.ReactComponent.state,
  }
)

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators(actions, dispatch),
  }
)

class ReactComponent extends Component {
  static propTypes = {
    react: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = {
      react: null,
    }
  }
  componentWillMount() {
  }
  componentDidMount() {
  }
  render() {
    return (
      <div>
        <h1>
          ReactComponent
        </h1>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactComponent)
