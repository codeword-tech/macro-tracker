import { clientId, organizationId } from './constants'
import { getSavedInitialReferrer, saveInitialReferrer } from './initialReferrer'
import { decodePromotionalURL } from './promotionalUrl'
import { timezones } from './timezones'
import { getSavedUser, saveUser } from './userId'

export function getDefaultPayload() {
  const { activityId, activityPlatform, campaignId, adId, userId, utmTerm } =
    decodePromotionalURL(window.location.host + window.location.href)

  const savedUserId = getSavedUser()
  const savedInitialReferrer = getSavedInitialReferrer()

  const initialReferrer = getSavedInitialReferrer()
  const referrer = document.referrer
  const pathname = window.location.pathname
  const href = window.location.href
  const userAgent = window.navigator.userAgent
  let locale = ''
  let country = ''

  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
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

  if (activityId) {
    saveInitialReferrer(activityId)
  }

  return {
    ...(initialReferrer && { initialReferrer }),
    ...(referrer && { referrer }),
    ...(pathname && { pathname }),
    ...(href && { href }),
    ...(userAgent && { userAgent }),
    ...(locale && { locale }),
    ...(country && { country }),
    ...(savedUserId && { savedUserId }),
    ...(savedInitialReferrer && { savedInitialReferrer }),
    // ...(utmContent && { utmContent }),
    // ...(utmSource && { utmSource }),
    // ...(utmMedium && { utmMedium }),
    // ...(utmCampaign && { utmCampaign }),
    // ...(utmUserId && { utmUserId }),
    ...(utmTerm && { utmTerm }),
    ...(adId && { adId }),
    ...(activityId && { activityId }),
    ...(campaignId && { campaignId }),
    ...(activityPlatform && { activityPlatform }),
    clientId,
    organizationId
  }
}
