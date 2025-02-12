import { domain } from './constants'

export function setCookie(
  name: string,
  value: string,
  maxAge = /** 1 year */ 31536000
) {
  let cookieValue = `${name}=${value}; Max-Age=${maxAge}; path=/; secure`

  if (domain) {
    cookieValue += `; domain=${domain}`
  }

  document.cookie = cookieValue

  return cookieValue
}

export function getCookie(name: string) {
  let cookie = {}
  document.cookie.split(';').forEach(function (el) {
    let [key, value] = el.split('=')
    cookie[key.trim()] = value
  })

  return cookie[name] ?? null
}
