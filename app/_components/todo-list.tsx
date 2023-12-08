'use client'
import { useState } from "react"
import { trpc } from "../_trpc/client"

export function TodoList () {
  const [content, setContent] = useState('')
  const getTodos = trpc.getTodos.useQuery()
  const addTodo = trpc.addTodo.useMutation({
    onSettled: () => {
      getTodos.refetch()
    }
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addTodo.mutate(content)
    setContent('')
  }

  return (
    <section>
      {JSON.stringify(getTodos.data)}
      <form onSubmit={handleSubmit}>
        <label htmlFor="content">Content</label>
        <input id="content" type="text" value={content} onChange={e => setContent(e.target.value)} />
        <button type="submit">Add Todo</button>
      </form>
    </section>
  )
}