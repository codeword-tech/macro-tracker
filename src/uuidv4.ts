/**
 * Generate uuid to identify the session. Random, not data-derived
 */
export function uuidv4() {
  return (1e7 + -1e3 + -4e3 + -8e3 + -1e11)
    .toString()
    .replace(/[018]/g, c =>
      (
        parseInt(c) ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (parseInt(c) / 4)))
      ).toString(16)
    )
}
