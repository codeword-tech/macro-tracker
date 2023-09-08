import { globalAttributes } from './constants'
import { getDefaultPayload } from './defaultPayload'
import { maskSuspiciousAttributes } from './maskSuspiciousAttributes'
import { sendEvent } from './sendEvent'

export function trackEvent(eventName: string, eventPayload?: Record<string, any>) {
  const defaultPayload = getDefaultPayload()
  const sanitizedPayload = maskSuspiciousAttributes({
    ...defaultPayload,
    ...eventPayload
  })
  // we don't want to sanitized global payload
  const payload = { ...sanitizedPayload, ...globalAttributes }

  return sendEvent(eventName, payload)
}
