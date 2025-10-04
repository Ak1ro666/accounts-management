import { z } from 'zod'

export const CONFIG = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  NODE_ENV: import.meta.env.NODE_ENV
} as const

const publicConfigSchema = z.object({
  API_BASE_URL: z.string().optional(),
  NODE_ENV: z.boolean().optional()
})

export const PUBLIC_CONFIG = publicConfigSchema.parse(import.meta.env)
