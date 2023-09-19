import { SESSION_COOKIE_KEY } from './constants'
import { getCookie, setCookie } from './cookie'
import { uuidv4 } from './uuidv4'

export function getSessionIdOrCreate() {
  const sessionId = getCookie(SESSION_COOKIE_KEY)

  if (!sessionId) {
    return createSessionId()
  }

  return sessionId
}

export function createSessionId() {
  /**
   * Try to keep same session id if session cookie exists, generate a new one otherwise.
   *   - First request in a session will generate a new session id
   *   - The next request will keep the same session id and extend the TTL for 30 more minutes
   */
  const lastSessionId = getSessionIdOrCreate()

  if (lastSessionId) {
    return lastSessionId
  }

  const sessionId = uuidv4()
  setCookie(SESSION_COOKIE_KEY, sessionId)

  return sessionId
}
