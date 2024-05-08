import { loadEnvConfig } from '@next/env'
import type { Config } from 'drizzle-kit'

loadEnvConfig(process.cwd(), process.env.NODE_ENV !== 'production')

export default {
  schema: './src/db/schema',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DRIZZLE_DATABASE_URL!,
  },
} satisfies Config
