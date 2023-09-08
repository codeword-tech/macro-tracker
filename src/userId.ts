import { USER_COOKIE_KEY, USER_UTM_KEY } from './constants'
import { getCookie, setCookie } from './cookie'

export function getUserId(): string | null {
  const userIdCookie = getCookie(USER_COOKIE_KEY)

  if (userIdCookie) {
    return userIdCookie
  }

  const qs = new URLSearchParams(window.location.search)
  const utmUserId = qs.get(USER_UTM_KEY)
  const numberOfSecondsInAYear = 31536000

  if (utmUserId) {
    setCookie(USER_COOKIE_KEY, utmUserId, numberOfSecondsInAYear)
    return utmUserId
  }

  return null
}

export function identifyUser(userId: string) {
  return setCookie(USER_COOKIE_KEY, userId)
}
