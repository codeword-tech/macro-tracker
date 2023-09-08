import { SESSION_COOKIE_KEY } from './constants'
import { getCookie, setCookie } from './cookie'
import { uuidv4 } from './uuidv4'

export function getSessionId() {
  return getCookie(SESSION_COOKIE_KEY)
}

/**
 * Set session id
 */

export function setSessionId() {
  /**
   * Try to keep same session id if session cookie exists, generate a new one otherwise.
   *   - First request in a session will generate a new session id
   *   - The next request will keep the same session id and extend the TTL for 30 more minutes
   */
  const sessionId = getSessionId() || uuidv4()
  setCookie(SESSION_COOKIE_KEY, sessionId)
}
