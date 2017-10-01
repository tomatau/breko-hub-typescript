import * as React from 'react'
import * as PropTypes from 'prop-types'
import { hasWindow, noop } from 'app/utils'
import { DefaultProps } from 'app/types'

interface Props extends DefaultProps {
  load: () => Promise<any>,
  children: (module: any) => JSX.Element | null | false
}

export default class CodeSplit extends React.Component<Props> {
  static defaultProps = {
    load: noop,
  };

  state = {
    module: null,
  };

  componentWillMount() {
    if (hasWindow) this.callLoad(this.props.load)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.callLoad(nextProps.load)
    }
  }

  callLoad(load) {
    this.setState({ module: null })
    load().then(module => {
      this.setState({ module: module.default })
    })
  }

  render() {
    const { children } = this.props
    const { module } = this.state
    return children(module)
  }
}
