import * as React from 'react'
import Helmet from 'react-helmet'

export interface Props {
  content?: Array<object>,
  headScripts?: Array<string>,
  stringScripts?: Array<string>,
  bodyScripts?: Array<string>,
  bodyStyles?: Array<string>,
  headStyles?: Array<string>,
  otherLinks?: Array<string>,
}

export default class Html extends React.Component<Props> {
  props: Props;

  static defaultProps = {
    content: [],
    headScripts: [],
    stringScripts: [],
    bodyScripts: [],
    headStyles: [],
    bodyStyles: [],
    otherLinks: [],
  };

  render() {
    const {
      content,
      otherLinks,
      stringScripts,
      headStyles,
      headScripts,
      bodyScripts,
      bodyStyles,
    } = this.props
    const helmet = Helmet.renderStatic()

    return (
      <html {...helmet.htmlAttributes.toComponent()}>
        <head>
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {otherLinks.map((props, i) => (
            <link key={i} {...props} />
          ))}
          {headStyles.map((style, i) => (
            <link
              key={i}
              href={style}
              type='text/css' rel='stylesheet' media='screen'
            />
          ))}
          {stringScripts.map((script, i) => (
            <script key={i} dangerouslySetInnerHTML={{
              __html: script,
            }} />
          ))}
          {headScripts.map((script, i) => (
            <script src={script} key={i} />
          ))}
        </head>
        <body {...helmet.bodyAttributes.toComponent()}>
          {content.map((props, i) => (
            <div key={i} {...props} />
          ))}
          {bodyScripts.map((script, i) => (
            <script key={i} src={script} />
          ))}
          {bodyStyles.map((style, i) => (
            <script key={i} dangerouslySetInnerHTML={{
              __html: `loadCSS('${style}')`,
            }} />
          ))}
          {bodyStyles.map((style, i) => (
            <noscript key={i} dangerouslySetInnerHTML={{
              __html: `<link href="${style}" rel="stylesheet" />`,
            }} />
          ))}
        </body>
      </html>
    )
  }
}

