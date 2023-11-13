import { clientId, organizationId } from './constants'
import { getPersistedValue } from './getPersistedValues'
import { getSessionIdOrCreate } from './sessionId'
import { timezones } from './timezones'

export function getDefaultPayload() {
  const {
    activityId,
    activityPlatform,
    campaignId,
    adId,
    customerId,
    adsetId,
    audienceId,
    audienceSetId,
    segmentId,
    utmTerm,
    utmCampaign,
    utmContent,
    utmMedium,
    utmSource,
    initialReferrer
  } = getPersistedValue()
  const sessionId = getSessionIdOrCreate()

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

  return {
    ...(campaignId && { campaignId }),
    ...(activityId && { activityId }),
    ...(customerId && { customerId }),
    ...(initialReferrer && { initialReferrer }),
    ...(pathname && { pathname }),
    ...(href && { href }),
    ...(userAgent && { userAgent }),
    ...(locale && { locale }),
    ...(country && { country }),
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
    ...(utmTerm && { utmTerm }),
    ...(adsetId && { adsetId }),
    ...(audienceId && { audienceId }),
    ...(audienceSetId && { audienceSetId }),
    ...(segmentId && { segmentId }),
    clientId,
    sessionId,
    organizationId
  }
}
