import { proxy, host, DATASOURCE, token } from './constants'

/**
 * Use `trackEvent` for sending events with default payload.
 * Use this to send event to endpoint with any default payload
 *
 */
export async function sendEvent(name: string, payload: Record<string, any>) {
  let url: string

  if (proxy) {
    url = `${proxy}/api/tracking`
  } else if (host) {
    let sanitizedHost = removeTrailingSlash(host)
    url = `${sanitizedHost}/v0/events?name=${DATASOURCE}&token=${token}`
  } else {
    throw new Error('Host not configured.')
  }

  const request = new XMLHttpRequest()
  request.open('POST', url, true)
  request.setRequestHeader('Content-Type', 'application/json')
  request.send(
    JSON.stringify({
      timestamp: new Date().toISOString(),
      action: name,
      version: '1',
      ...payload
    })
  )
}

function removeTrailingSlash(str: string) {
  return str.replaceAll(/\/+$/gm, '')
}
