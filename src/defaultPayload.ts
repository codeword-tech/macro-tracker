import { clientId, organizationId } from './constants'
import {
  getSavedInitialActivityId,
  saveInitialActivityId
} from './initialAcitivityId'
import { getSavedInitialReferrer, saveInitialReferrer } from './initialReferrer'
import { decodePromotionalURL } from './promotionalURL'
import { getSessionId } from './sessionId'
import { timezones } from './timezones'
import { getSavedUser, saveUser } from './userId'

export function getDefaultPayload() {
  const {
    activityId,
    activityPlatform,
    campaignId,
    adId,
    userId,
    utmTerm,
    utmCampaign,
    utmContent,
    utmMedium,
    utmSource
  } = decodePromotionalURL(window.location.host + window.location.href)

  const savedUserId = getSavedUser()
  const savedInitialReferrer = getSavedInitialReferrer()
  const savedInitialActivityId = getSavedInitialActivityId()
  const sessionId = getSessionId()

  const initialReferrer = activityId
  const referrer = document.referrer
  const pathname = window.location.pathname
  const href = window.location.href
  const userAgent = window.navigator.userAgent
  let locale = ''
  let country = ''
  let timezone = ''
  let screenWidth = null
  let screenHeight = null
  let screenDpi = null

  try {
    screenWidth = window.screen.width
    screenHeight = window.screen.height
    screenDpi = window.devicePixelRatio
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    country = timezones[timezone]
    locale =
      navigator.languages && navigator.languages.length
        ? navigator.languages[0]
        : // @ts-ignore
          navigator.userLanguage ||
          navigator.language ||
          // @ts-ignore
          navigator.browserLanguage ||
          'en'
  } catch (error) {
    // ignore error
  }

  // save one time data for later
  if (userId) {
    saveUser(userId)
  }

  if (referrer) {
    saveInitialReferrer(referrer)
  }

  if (activityId) {
    saveInitialActivityId(activityId)
  }

  return {
    // order matters here in initialReferrer
    // we first check the current referrer if not present we check
    // saved referrer
    ...((initialReferrer || savedInitialReferrer) && {
      initialReferrer: initialReferrer || savedInitialReferrer
    }),
    ...(referrer && { referrer }),
    ...(pathname && { pathname }),
    ...(href && { href }),
    ...(userAgent && { userAgent }),
    ...(locale && { locale }),
    ...(country && { country }),
    ...((savedUserId || userId) && { userId: userId || savedUserId }),
    ...(utmTerm && { utmTerm }),
    ...(adId && { adId }),
    ...(activityId && { activityId }),
    ...((activityId || savedInitialActivityId) && {
      initialActivityId: activityId || savedInitialActivityId
    }),
    ...(campaignId && { campaignId }),
    ...(activityPlatform && { activityPlatform }),
    ...(timezone && { timezone }),
    ...(screenWidth && { screenWidth }),
    ...(screenHeight && { screenHeight }),
    ...(screenDpi && { screenDpi }),
    ...(utmCampaign && { utmCampaign }),
    ...(utmContent && { utmContent }),
    ...(utmMedium && { utmMedium }),
    ...(utmSource && { utmSource }),
    clientId,
    sessionId,
    organizationId
  }
}
