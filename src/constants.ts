export const SESSION_COOKIE_KEY = 'session-id'
export const USER_COOKIE_KEY = 'user-id'
export const INITIAL_REFERRER_COOKIE_KEY = 'initial-referrer'
export const INITIAL_ACTIVITY_ID_COOKIE_KEY = 'initial-activity-id'
export const INITIAL_CAMPAIGN_ID_COOKIE_KEY = 'initial-campaign-id'
export let DATASOURCE = 'analytics_events'

export let proxy: string,
  token: string,
  host: string,
  domain: string,
  clientId: string,
  organizationId: string

if (document.currentScript) {
  host = document.currentScript.getAttribute('data-host')
  proxy = document.currentScript.getAttribute('data-proxy')
  token = document.currentScript.getAttribute('data-token')
  domain = document.currentScript.getAttribute('data-domain')
  clientId = document.currentScript.getAttribute('data-client-id')
  organizationId = document.currentScript.getAttribute('data-organization-id')
  DATASOURCE = document.currentScript.getAttribute('data-datasource') || DATASOURCE

  // for (const attr of Array.from(document.currentScript.attributes)) {
  //   if (attr.name.startsWith('tb_')) {
  //     globalAttributes[attr.name.slice(3)] = attr.value
  //   }
  // }
}
