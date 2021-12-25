import { useInterpret, useSelector } from '@xstate/react'

import { todoMachine } from '../machine/todo.machine'

import { useTodoQuery } from './todo-api.hook'

export const useTodoService = () => {
  const { refetch: fetchTodos } = useTodoQuery({ disable: true })
  const service = useInterpret(todoMachine, {
    services: {
      fetchTodos: async () => {
        const result = await fetchTodos()

        return result.data
      },
    },
  })
  const { send } = service
  const submitTodo = (todo: string) => {
    send({ type: 'SUBMIT', payload: todo })
  }
  const deleteTodo = (id: string) => {
    send({ type: 'DELETE', payload: id })
  }
  const doneTodo = (id: string) => {
    send({ type: 'DONE', payload: id })
  }
  const todos = useSelector(service, (state) => state.context.todos)

  return { submitTodo, deleteTodo, doneTodo, todos }
}
