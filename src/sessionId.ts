import { SESSION_KEY } from './constants'
import { getCookie, setCookie } from './cookie'
import { uuidv4 } from './uuidv4'

/**
 * Try to keep same session id if session cookie exists, generate a new one otherwise.
 *   - First request in a session will generate a new session id
 *   - The next request will keep the same session id and extend the TTL for 30 more minutes
 */

export function getSessionIdOrCreate() {
  const sessionId = getCookie(SESSION_KEY)

  if (!sessionId) {
    return createSessionId()
  }

  return sessionId
}

export function createSessionId() {
  const sessionId = uuidv4()
  setCookie(SESSION_KEY, sessionId)

  return sessionId
}
