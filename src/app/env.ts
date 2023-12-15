import { z, string } from 'zod'
export const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: string(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string(),
})

export const ENV = envSchema.parse(process.env);