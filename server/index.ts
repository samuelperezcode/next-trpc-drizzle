import { type } from 'os'
import { publicProcedure, router } from './trpc'

export const appRouter = router({
  getTodos: publicProcedure.query(
    async () => {
      return [10,30,50]
    }
  ) 
  
})

export type AppRouter = typeof appRouter