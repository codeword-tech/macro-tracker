import { INITIAL_REFERRER_COOKIE_KEY } from './constants'
import { getCookie, setCookie } from './cookie'

export function getSavedInitialReferrer(): string | null {
  const initialReferrerCookie = getCookie(INITIAL_REFERRER_COOKIE_KEY)

  if (initialReferrerCookie) {
    return initialReferrerCookie
  }

  return null
}

export function saveInitialReferrer(initialReferrer: string) {
  const numberOfSecondsInAYear = 31536000

  return setCookie(
    INITIAL_REFERRER_COOKIE_KEY,
    initialReferrer,
    numberOfSecondsInAYear
  )
}
