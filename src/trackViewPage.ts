import { trackEvent } from './trackEvent'

/**
 * Track page hit
 */
export function trackViewPage() {
  // If local development environment
  // if (/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(location.hostname) || location.protocol === 'file:') return;
  // If test environment
  // @ts-ignore
  if (window.__nightmare || window.navigator.webdriver || window.Cypress) return

  // Wait a bit for SPA routers
  setTimeout(() => {
    trackEvent('view_page')
  }, 300)
}
