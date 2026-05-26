// @ts-check

/** @param {string} value */
export function normalizeText(value) {
  return value.replace(/\r\n/g, "\n").replace(/\s+/g, " ").trim();
}

/** @param {string} value */
export function splitIntoClaims(value) {
  const normalized = value
    .replace(/\r\n/g, "\n")
    .replace(/([.!?])\s+(?=[A-Z0-9"'])/g, "$1\n")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  return normalized
    .flatMap((line) => line.split(/(?<=[.!?])\s+(?=[A-Z0-9"'])/g))
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length >= 12);
}

/** @param {string} value */
export function countWords(value) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

/** @param {string} value */
export function toLower(value) {
  return value.toLowerCase();
}

/** @param {string} value */
export function sentenceCase(value) {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}
