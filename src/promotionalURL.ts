interface PromotionalUrlOptions {
  userId?: string
  campaignId?: string
  activityId?: string
  activityPlatform?: 'EMAIL'
  adId?: string
  utmTerm?: string
  utmCampaign?: string
  utmMedium?: string
  utmSource?: string
  utmContent?: string
}

export function encodePromotionalURL(
  _url: string,
  {
    userId,
    campaignId,
    activityId,
    activityPlatform,
    adId,
    utmTerm
  }: PromotionalUrlOptions
) {
  const url = new URL(_url)

  if (userId) {
    url.searchParams.set('utm_uid', userId)
  }

  url.searchParams.set('utm_campaign', campaignId)
  url.searchParams.set('utm_medium', activityId)
  url.searchParams.set('utm_source', activityPlatform)

  if (adId) {
    url.searchParams.set('utm_content', activityPlatform)
  }

  if (utmTerm) {
    url.searchParams.set('utm_term', utmTerm)
  }

  return url.toString()
}

export function decodePromotionalURL(_url: string): PromotionalUrlOptions {
  const url = new URL(_url)

  return {
    userId: url.searchParams.get('utm_uid'),
    campaignId: url.searchParams.get('utm_campaign'),
    activityId: url.searchParams.get('utm_medium'),
    activityPlatform: url.searchParams.get('utm_source') as 'EMAIL',
    adId: url.searchParams.get('utm_content'),
    utmCampaign: url.searchParams.get('utm_campaign'),
    utmMedium: url.searchParams.get('utm_medium'),
    utmSource: url.searchParams.get('utm_source'),
    utmContent: url.searchParams.get('utm_content'),
    utmTerm: url.searchParams.get('utm_term')
  }
}
