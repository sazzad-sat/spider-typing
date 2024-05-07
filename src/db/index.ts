import 'server-only'

import Env from '@/configs/env'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

const sql = neon(Env.DatabaseUrl)
const db = drizzle(sql)

export default db
