import { loadEnvConfig } from '@next/env'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { migrate } from 'drizzle-orm/neon-http/migrator'

loadEnvConfig(process.cwd(), process.env.NODE_ENV !== 'production')

const sql = neon(process.env.DRIZZLE_DATABASE_URL!)
const db = drizzle(sql)

async function main() {
  try {
    await migrate(db, { migrationsFolder: './drizzle' })
    console.log('Migration completed 🔥')
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

main()
