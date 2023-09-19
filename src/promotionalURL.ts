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
    url.searchParams.set('utm_uid', `M_${userId}`)
  }

  url.searchParams.set('utm_campaign', `M_${campaignId}`)
  url.searchParams.set('utm_medium', `M_${activityId}`)
  url.searchParams.set('utm_source', `M_${activityPlatform}`)

  if (adId) {
    url.searchParams.set('utm_content', `M_${adId}`)
  }

  if (utmTerm) {
    url.searchParams.set('utm_term', utmTerm)
  }

  return url.toString()
}

export function decodePromotionalURL(_url: string): PromotionalUrlOptions {
  const url = new URL(_url)

  const utmUid = url.searchParams.get('utm_uid')
  const utmMedium = url.searchParams.get('utm_medium')
  const utmSource = url.searchParams.get('utm_source')
  const utmCampaign = url.searchParams.get('utm_campaign')
  const utmContent = url.searchParams.get('utm_content')
  const utmTerm = url.searchParams.get('utm_term')

  return {
    userId: decodeValue(utmUid, 'M_'),
    campaignId: decodeValue(utmCampaign, 'M_'),
    activityId: decodeValue(utmMedium, 'M_'),
    activityPlatform: decodeValue(utmSource, 'M_') as 'EMAIL',
    adId: decodeValue(utmContent, 'M_'),
    utmCampaign: utmCampaign,
    utmMedium: utmMedium,
    utmSource: utmSource,
    utmContent: utmContent,
    utmTerm: utmTerm
  }
}

function decodeValue(value: string, identifier: string) {
  if (value.startsWith(identifier)) {
    return value.replace(identifier, '')
  }

  return null
}
