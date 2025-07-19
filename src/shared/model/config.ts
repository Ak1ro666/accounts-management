export const CONFIG = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  TEST_ENV_BASE_URL: import.meta.env.TEST_ENV_BASE_URL,
  NODE_ENV: import.meta.env.NODE_ENV
} as const
