export const SESSION_KEY = 'session-id'
export const CUSTOMER_KEY = 'user-id'
export const REFERRER_KEY = 'initial-referrer'
export const CAMPAIGN_ID_KEY = 'initial-campaign-id'
export const ACTIVITY_ID_KEY = 'initial-activity-id'
export const ACTIVITY_PLATFORM_KEY = 'initial-activity-platform'
export const ADSET_ID_KEY = 'initial-adset-id'
export const AUDIENCE_ID_KEY = 'initial-audience-id'
export const AUDIENCE_SET_ID_KEY = 'initial-audiendce-set-id'
export const AD_ID_KEY = 'initial-ad-id'
export const SEGMENT_ID_KEY = 'initial-segment-id'

export let DATASOURCE = 'website_source'

export let proxy: string,
  token: string,
  host: string,
  domain: string,
  clientId: string,
  organizationId: string,
  triggerDefaultEvent: boolean

if (document.currentScript) {
  host = document.currentScript.getAttribute('data-host')
  proxy = document.currentScript.getAttribute('data-proxy')
  token = document.currentScript.getAttribute('data-token')
  domain = document.currentScript.getAttribute('data-domain')
  clientId = document.currentScript.getAttribute('data-client-id')
  organizationId = document.currentScript.getAttribute('data-organization-id')
  triggerDefaultEvent =
    document.currentScript.getAttribute('data-trigger-default-event') === 'false'
      ? false
      : true
  DATASOURCE = document.currentScript.getAttribute('data-datasource') || DATASOURCE

  // for (const attr of Array.from(document.currentScript.attributes)) {
  //   if (attr.name.startsWith('tb_')) {
  //     globalAttributes[attr.name.slice(3)] = attr.value
  //   }
  // }
}
