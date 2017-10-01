import * as React from 'react'
import { connect } from 'react-redux'
import DocumentMeta from 'react-helmet'
import * as cx from 'classnames'
import { apiFetch } from 'app/modules/bar'
import { get, noop } from 'app/utils'
// import style from './BarRoute.module.scss'
import { DefaultProps } from 'app/types'

interface Props extends DefaultProps {
  bar: string[],
  apiFetch: Function,
}

@connect(state => ({
  bar: get('bar.data')(state),
}), { apiFetch })
export default class BarRoute extends React.Component<Props> {
  static defaultProps = {
    bar: [],
    apiFetch: noop,
  };

  componentDidMount() {
    this.props.apiFetch()
  }

  render() {
    const { bar, className } = this.props
    return (
      <section className={cx(`BarRoute`, className)}>
        <DocumentMeta>
          <title>Bar</title>
        </DocumentMeta>
        <h3>Bar</h3>
        <p>This route is making an api request</p>
        <p>If you change the response from <code>server/api/bar</code> endpoint</p>
        <p>And then navigate away and back to this route, you'll see the changes immediately</p>
        {/* <div className={style.block}> */}
        <div>
          {bar.map((item, i) =>
            <p key={i}>{item}</p>
          )}
        </div>
      </section>
    )
  }
}
