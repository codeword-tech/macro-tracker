import { trackEvent } from './trackEvent'
import { trackPageHit } from './trackPageHit'
import { identifyUser } from './userId'

// Client
;(window as any).Macro = { trackEvent, identifyUser }

// Event listener
window.addEventListener('hashchange', trackPageHit)
const his = window.history

if (his.pushState) {
  const originalPushState = his['pushState']
  his.pushState = function () {
    originalPushState.apply(this, arguments)
    trackPageHit()
  }
  window.addEventListener('popstate', trackPageHit)
}

let lastPage
function handleVisibilityChange() {
  if (!lastPage && document.visibilityState === 'visible') {
    trackPageHit()
  }
}

// don;t count if the page is loaded for prefetching reasons; wait for user to show up on the page
if ((document as any).visibilityState === 'prerender') {
  document.addEventListener('visibilitychange', handleVisibilityChange)
} else {
  trackPageHit()
}
