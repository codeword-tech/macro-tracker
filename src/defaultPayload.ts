import { clientId, organizationId } from './constants'
import {
  getSavedInitialActivityId,
  saveInitialActivityId
} from './initialActivityId'
import {
  getSavedInitialCampaignId,
  saveInitialCampaignId
} from './initialCampaignId'
import { decodePromotionalURL } from './promotionalURL'
import { getSessionIdOrCreate } from './sessionId'
import { timezones } from './timezones'
import { getSavedUser, saveUser } from './userId'

export function getDefaultPayload() {
  const {
    activityId,
    activityPlatform,
    campaignId,
    adId,
    userId: newUserId,
    utmTerm,
    utmCampaign,
    utmContent,
    utmMedium,
    utmSource
  } = decodePromotionalURL(window.location.host + window.location.href)

  let userId = getSavedUser()
  // let initialReferrer = getSavedInitialReferrer()
  let initialActivityId = getSavedInitialActivityId()
  let initialCampaignId = getSavedInitialCampaignId()
  const sessionId = getSessionIdOrCreate()

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
  if (newUserId) {
    userId = saveUser(newUserId)
  }

  // if (newReferrer) {
  //   initialReferrer = saveInitialReferrer(newReferrer)
  // }

  if (activityId) {
    initialActivityId = saveInitialActivityId(activityId)
  }

  if (campaignId) {
    initialCampaignId = saveInitialCampaignId(campaignId)
  }

  return {
    // ...(initialReferrer && { initialReferrer }),
    ...(initialCampaignId && { initialCampaignId }),
    ...(initialActivityId && { initialActivityId }),
    ...(userId && { userId }),
    ...(referrer && { referrer }),
    ...(pathname && { pathname }),
    ...(href && { href }),
    ...(userAgent && { userAgent }),
    ...(locale && { locale }),
    ...(country && { country }),
    ...(utmTerm && { utmTerm }),
    ...(adId && { adId }),
    ...(activityId && { activityId }),
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
