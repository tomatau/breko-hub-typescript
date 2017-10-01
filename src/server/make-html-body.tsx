import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import Html, { Props as HtmlProps } from 'server/Html'

const makeHtmlBody = (props: HtmlProps) =>
  `<!doctype html>${
    ReactDOMServer.renderToStaticMarkup(<Html {...props} />)
  }`
  
export default makeHtmlBody