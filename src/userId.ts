import { USER_COOKIE_KEY } from './constants'
import { getCookie, setCookie } from './cookie'

export function getSavedUser(): string | null {
  const userIdCookie = getCookie(USER_COOKIE_KEY)

  if (userIdCookie) {
    return userIdCookie
  }

  return null
}

export function saveUser(userId: string) {
  const numberOfSecondsInAYear = 31536000

  setCookie(USER_COOKIE_KEY, userId, numberOfSecondsInAYear)
  return userId
}
