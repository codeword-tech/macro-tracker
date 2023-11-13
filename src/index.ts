import { CUSTOMER_KEY } from './constants'
import { trackEvent } from './trackEvent'
import { trackViewPage } from './trackViewPage'
import { setCookie } from './cookie'

// Client
;(window as any).Macro = {
  trackEvent,
  identifyUser: (value: string) => setCookie(CUSTOMER_KEY, value)
}

// Event listener
window.addEventListener('hashchange', trackViewPage)
const his = window.history

if (his.pushState) {
  const originalPushState = his['pushState']
  his.pushState = function () {
    originalPushState.apply(this, arguments)
    trackViewPage()
  }
  window.addEventListener('popstate', trackViewPage)
}

let lastPage
function handleVisibilityChange() {
  if (!lastPage && document.visibilityState === 'visible') {
    trackViewPage()
  }
}

// don;t count if the page is loaded for prefetching reasons; wait for user to show up on the page
if ((document as any).visibilityState === 'prerender') {
  document.addEventListener('visibilitychange', handleVisibilityChange)
} else {
  trackViewPage()
}
