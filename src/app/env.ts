import { z, string } from 'zod'
export const envSchema = z.object({
  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: string(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string(),

  // Pexels
  PEXELS_API_KEY: string()
})

type EnvSchemaType = z.infer<typeof envSchema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvSchemaType{}
  }
}