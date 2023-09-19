import { INITIAL_ACTIVITY_ID_COOKIE_KEY } from './constants'
import { getCookie, setCookie } from './cookie'

export function getSavedInitialActivityId(): string | null {
  const initialActivityIdCookie = getCookie(INITIAL_ACTIVITY_ID_COOKIE_KEY)

  if (initialActivityIdCookie) {
    return initialActivityIdCookie
  }

  return null
}

export function saveInitialActivityId(initialActivityId: string) {
  const numberOfSecondsInAYear = 31536000

  setCookie(
    INITIAL_ACTIVITY_ID_COOKIE_KEY,
    initialActivityId,
    numberOfSecondsInAYear
  )

  return initialActivityId
}
