export const SESSION_COOKIE_KEY = 'session-id'
export const USER_UTM_KEY = 'utm_uid'
export const USER_COOKIE_KEY = 'user-id'
export let DATASOURCE = 'analytics_events'
export let globalAttributes = {}

export let proxy: string, token: string, host: string, domain: string

if (document.currentScript) {
  host = document.currentScript.getAttribute('data-host')
  proxy = document.currentScript.getAttribute('data-proxy')
  token = document.currentScript.getAttribute('data-token')
  domain = document.currentScript.getAttribute('data-domain')
  DATASOURCE = document.currentScript.getAttribute('data-datasource') || DATASOURCE

  for (const attr of Array.from(document.currentScript.attributes)) {
    if (attr.name.startsWith('tb_')) {
      globalAttributes[attr.name.slice(3)] = attr.value
    }
  }
}
