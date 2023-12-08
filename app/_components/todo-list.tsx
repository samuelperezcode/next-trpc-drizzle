'use client'
import { useState } from "react"
import { trpc } from "../_trpc/client"
import { serverClient } from "../_trpc/serverClient"

export function TodoList ({initialTodos}: {initialTodos: Awaited<ReturnType<(typeof serverClient)["getTodos"]>>}) {
  const [content, setContent] = useState('')

  const getTodos = trpc.getTodos.useQuery(undefined,{
    initialData: initialTodos,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
  const addTodo = trpc.addTodo.useMutation({
    onSettled: () => {
      getTodos.refetch()
    }
  })
  const setDone = trpc.setDone.useMutation({
    onSettled: () => {
      getTodos.refetch()
    }
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addTodo.mutate(content)
    setContent('')
  }

  const handleChange = (id: number, done:number | null) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setDone.mutate({id: Number(id), done: done ? 0 : 1})
  }

  return (
    <section className="m-4">
       <form onSubmit={handleSubmit} className="flex gap-x-3 items-center">
        <label htmlFor="content">Content</label>
        <input className="py-1 border-slate-600 border rounded-md" id="content" type="text" value={content} onChange={e => setContent(e.target.value)} />
        <button className="px-2 py-1 bg-sky-700 text-white rounded-md" type="submit">Add Todo</button>
      </form>
      <ul className="my-5 text-black text-3xl">
        {
          getTodos.data?.map( todo => (
            <li key={todo.id} className="flex gap-x-3 ite">
              <input onChange={handleChange(todo.id,todo.done)}  type="checkbox" checked={!!todo.done} id={`check-${todo.id}`} />
              <label htmlFor={`check-${todo.id}`}>{todo.content}</label>
            </li>
          ))
        }
      </ul>
    </section>
  )
}