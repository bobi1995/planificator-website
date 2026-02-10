const STORAGE_KEY = 'cookie-consent';

export type ConsentStatus = 'accepted' | 'declined' | 'unknown';

/**
 * Read consent status from localStorage.
 * Returns 'unknown' during SSR or if no choice has been recorded.
 */
export function getConsentStatus(): ConsentStatus {
  if (typeof window === 'undefined') return 'unknown';
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'accepted') return 'accepted';
  if (stored === 'declined') return 'declined';
  return 'unknown';
}

/**
 * Save consent choice to localStorage.
 */
export function setConsentStatus(status: 'accepted' | 'declined'): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, status);
}

/**
 * Clear consent choice (for "change settings" functionality).
 */
export function clearConsentStatus(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
