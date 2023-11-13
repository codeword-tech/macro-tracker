import { REFERRER_KEY } from './constants'
import {
  CUSTOMER_KEY,
  ACTIVITY_ID_KEY,
  CAMPAIGN_ID_KEY,
  ACTIVITY_PLATFORM_KEY,
  AD_ID_KEY,
  ADSET_ID_KEY,
  AUDIENCE_ID_KEY,
  AUDIENCE_SET_ID_KEY,
  SEGMENT_ID_KEY
} from './constants'
import { getCookie, setCookie } from './cookie'
import { decodePromotionalURL } from './promotionalURL'

export function getPersistedValue() {
  let {
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
    utmSource
  } = decodePromotionalURL(window.location.host + window.location.href)

  customerId = saveValueOrGetValue(CUSTOMER_KEY, customerId)
  activityId = saveValueOrGetValue(ACTIVITY_ID_KEY, activityId)
  activityPlatform = saveValueOrGetValue(ACTIVITY_PLATFORM_KEY, activityPlatform)
  campaignId = saveValueOrGetValue(CAMPAIGN_ID_KEY, campaignId)
  adId = saveValueOrGetValue(AD_ID_KEY, adId)
  adsetId = saveValueOrGetValue(ADSET_ID_KEY, adsetId)
  audienceId = saveValueOrGetValue(AUDIENCE_ID_KEY, audienceId)
  audienceSetId = saveValueOrGetValue(AUDIENCE_SET_ID_KEY, audienceSetId)
  segmentId = saveValueOrGetValue(SEGMENT_ID_KEY, segmentId)
  const initialReferrer = getCookie(REFERRER_KEY)

  return {
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
  }
}

function saveValueOrGetValue(key: string, value: string) {
  if (value) {
    return setCookie(key, value)
  } else {
    return getCookie(key)
  }
}
