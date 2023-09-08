/**
 * Try to mask PII and potential sensible attributes
 *
 */
export const maskSuspiciousAttributes = (
  payload: Record<string, any>
): Record<string, any> => {
  const attributesToMask = [
    'username',
    'user',
    'user_id',
    'userid',
    'password',
    'pass',
    'pin',
    'passcode',
    'token',
    'api_token',
    'email',
    'address',
    'phone',
    'sex',
    'gender',
    'order',
    'order_id',
    'orderid',
    'payment',
    'credit_card'
  ]

  // Deep copy
  let _payload = JSON.stringify(payload)
  attributesToMask.forEach(attr => {
    _payload = _payload.replaceAll(
      new RegExp(`("${attr}"):(".+?"|\\d+)`, 'mgi'),
      '$1:"********"'
    )
  })

  return JSON.parse(_payload)
}
