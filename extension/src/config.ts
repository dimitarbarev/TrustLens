/**
 * API configuration.
 * Override with PLASMO_PUBLIC_API_BASE_URL in a `.env` file.
 */
export const API_BASE_URL =
  process.env.PLASMO_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000"
