import * as React from 'react'
import * as history from 'history'
import * as PropTypes from 'prop-types'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

interface Props {
  history: history.History
}

class StaticRouter extends React.Component<Props> {
  props: Props;
  
  static defaultProps = {
    history: createMemoryHistory(),
  }

  static childContextTypes = {
    router: PropTypes.object.isRequired,
  }

  getChildContext() {
    return {
      router: {
        staticContext: this.props.history,
      },
    }
  }

  render() {
    const { history, ...props } = this.props

    return <Router {...props} history={history} />
  }
}

export default StaticRouter
