import * as isoFetch from 'isomorphic-fetch'
import * as debug from 'debug'

const log = debug('utils.request')

export const fetch = async (endpoint, options?) => {
  log('requesting', endpoint)
  const response = await _internals.isoFetch(endpoint, options)
  log('respsonse', { endpoint, status: response.status })

  if (response.status >= 400) {
    throw new Error(`Response error: ${endpoint}`)
  }

  if (response.headers.has('content-length')
    && Number(response.headers.get('content-length')) <= 0) {
    return null
  }

  const contentType = response.headers.get('content-type')

  return ~contentType.indexOf('application/json')
    ? response.json()
    : response.text()
}

// NOTE: wrapped in object for stubability in testing
export const _internals = { isoFetch }