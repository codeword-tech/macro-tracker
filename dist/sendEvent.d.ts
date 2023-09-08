/**
 * Use `trackEvent` for sending events with default payload.
 * Use this to send event to endpoint with any default payload
 *
 */
export declare function sendEvent(name: string, payload: Record<string, any>): Promise<void>;
