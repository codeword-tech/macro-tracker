interface PromotionalUrlOptions {
  customerId?: string
  campaignId?: string
  activityId?: string
  activityPlatform?: 'EMAIL'
  adId?: string
  adsetId?: string
  audienceId?: string
  audienceSetId?: string
  segmentId?: string
  utmTerm?: string
  utmCampaign?: string
  utmMedium?: string
  utmSource?: string
  utmContent?: string
}

export function encodePromotionalURL(
  _url: string,
  {
    customerId,
    adsetId,
    audienceId,
    audienceSetId,
    segmentId,
    utmCampaign,
    utmContent,
    utmMedium,
    utmSource,
    campaignId,
    activityId,
    activityPlatform,
    adId,
    utmTerm
  }: PromotionalUrlOptions
) {
  const url = new URL(_url)

  url.searchParams.set('campaign-id', `M_${campaignId}`)
  url.searchParams.set('activity-id', `M_${activityId}`)
  url.searchParams.set('activity-platform', `M_${activityPlatform}`)

  if (customerId) {
    url.searchParams.set('customer-id', `M_${customerId}`)
  }

  if (adId) {
    url.searchParams.set('ad-id', `M_${adId}`)
  }

  if (adsetId) {
    url.searchParams.set('adset-id', `M_${adsetId}`)
  }

  if (audienceId) {
    url.searchParams.set('audience-id', `M_${audienceId}`)
  }

  if (audienceSetId) {
    url.searchParams.set('audience-set-id', `M_${audienceSetId}`)
  }

  if (segmentId) {
    url.searchParams.set('segment-id', `M_${segmentId}`)
  }

  if (utmCampaign) {
    url.searchParams.set('utm-campaign', utmCampaign)
  }

  if (utmContent) {
    url.searchParams.set('utm-content', utmContent)
  }

  if (utmMedium) {
    url.searchParams.set('utm-medium', utmMedium)
  }

  if (utmSource) {
    url.searchParams.set('utm-source', utmSource)
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
  const campaignId = url.searchParams.get('campaign-id')
  const activityId = url.searchParams.get('activity-id')
  const activityPlatform = url.searchParams.get('activity-platform')
  const customerId = url.searchParams.get('customer-id')
  const adId = url.searchParams.get('ad-id')
  const adsetId = url.searchParams.get('adset-id')
  const audienceId = url.searchParams.get('audience-id')
  const audienceSetId = url.searchParams.get('audience-set-id')
  const segmentId = url.searchParams.get('segment-id')

  return {
    campaignId: decodeValue(campaignId, 'M_'),
    activityId: decodeValue(activityId, 'M_'),
    activityPlatform: decodeValue(activityPlatform, 'M_') as 'EMAIL',
    customerId: decodeValue(customerId, 'M_'),
    adId: decodeValue(adId, 'M_'),
    adsetId: decodeValue(adsetId, 'M_'),
    audienceId: decodeValue(audienceId, 'M_'),
    audienceSetId: decodeValue(audienceSetId, 'M_'),
    segmentId: decodeValue(segmentId, 'M_'),
    utmCampaign: utmCampaign,
    utmContent: utmContent,
    utmMedium: utmMedium,
    utmSource: utmSource,
    utmTerm: utmTerm
  }
}

function decodeValue(value: string, identifier: string) {
  if (!value) return null

  if (value.startsWith(identifier)) {
    return value.replace(identifier, '')
  }

  return null
}
