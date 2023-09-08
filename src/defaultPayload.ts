import { timezones } from './timezones'
import { getUserId } from './userId'

export function getDefaultPayload() {
  const qs = new URLSearchParams(window.location.search)
  const utmContent = qs.get('utm_content')
  const utmSource = qs.get('utm_source')
  const utmMedium = qs.get('utm_medium')
  const utmTerm = qs.get('utm_term')
  const utmCampaign = qs.get('utm_campaign')
  // TODO: save it and send it for later
  const utmUserId = getUserId()
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

  return {
    ...(referrer && { referrer }),
    ...(pathname && { pathname }),
    ...(href && { href }),
    ...(userAgent && { userAgent }),
    ...(locale && { locale }),
    ...(country && { country }),
    ...(utmContent && { utmContent }),
    ...(utmSource && { utmSource }),
    ...(utmMedium && { utmMedium }),
    ...(utmTerm && { utmTerm }),
    ...(utmCampaign && { utmCampaign }),
    ...(utmUserId && { utmUserId })
  }
}
