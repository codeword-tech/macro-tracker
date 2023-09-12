import { getDefaultPayload } from './defaultPayload'
import { maskSuspiciousAttributes } from './maskSuspiciousAttributes'
import { sendEvent } from './sendEvent'

export function trackEvent(eventName: string, eventPayload?: Record<string, any>) {
  const defaultPayload = getDefaultPayload()
  const sanitizedPayload = maskSuspiciousAttributes({
    ...defaultPayload,
    ...eventPayload
  })

  return sendEvent(eventName, sanitizedPayload)
}
