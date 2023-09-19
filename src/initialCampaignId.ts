import { INITIAL_CAMPAIGN_ID_COOKIE_KEY } from './constants'
import { getCookie, setCookie } from './cookie'

export function getSavedInitialCampaignId(): string | null {
  const initialCampaignIdCookie = getCookie(INITIAL_CAMPAIGN_ID_COOKIE_KEY)

  if (initialCampaignIdCookie) {
    return initialCampaignIdCookie
  }

  return null
}

export function saveInitialCampaignId(initialCampaignId: string) {
  const numberOfSecondsInAYear = 31536000

  setCookie(
    INITIAL_CAMPAIGN_ID_COOKIE_KEY,
    initialCampaignId,
    numberOfSecondsInAYear
  )
  return initialCampaignId
}
