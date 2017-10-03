import * as debug from 'debug'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as cx from 'classnames'
import DocumentMeta from 'react-helmet'
import { Switch, Route } from 'react-router-dom'
import CodeSplit from 'app/components/CodeSplit'
import * as styles from './App.module.scss'

const log = debug('App')

export default class App extends React.Component {
  render() {
    log('rendering')
    return (
      <div className={cx(`App`, styles.app)}>
        <DocumentMeta
          defaultTitle='Breko Hub'
          titleTemplate='%s | Breko Hub'>
          <html lang='en' />
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width,initial-scale=1.0' />
          <meta name='description' content='Breko Hub, a minimal boilerplate for building universal react applications' />
          <meta name='keywords' content='react,redux,react-router,koa,universal,babel,es7,hmr,webpack' />
        </DocumentMeta>
        <h1>Breko Hub</h1>
        <main className={styles.content}>
          <Switch>
            <CodeSplitRoute
              exact
              path='/'
              load={() => import('app/routes/HomeRoute')}
            />
            <CodeSplitRoute
              path='/bar'
              load={() => import('app/routes/BarRoute')}
            />
          </Switch>
        </main>
      </div>
    )
  }
}

const CodeSplitRoute = ({ load, ...props }) => (
  <Route {...props}
    render={() => (
      <CodeSplit load={load}>
        {(Comp) => Comp && <Comp />}
      </CodeSplit>
    )}
  />
)
