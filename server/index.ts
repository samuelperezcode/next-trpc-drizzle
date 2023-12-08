import { publicProcedure, router } from './trpc'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import Database from 'better-sqlite3'
import { todos } from '@/db/schema'

const sqlite = new Database('sqlite.db')
const db = drizzle(sqlite)

migrate(db, {migrationsFolder: 'drizzle'})

export const appRouter = router({
  getTodos: publicProcedure.query(
    async () => {
      return await db.select().from(todos).all()
    }
  ) 
  
})

export type AppRouter = typeof appRouter