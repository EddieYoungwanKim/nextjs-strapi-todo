import { createContext, FC, useContext } from 'react'

import { useTodoService } from '../hooks/todo-service.hook'

const TodoContext = createContext<ReturnType<typeof useTodoService> | undefined>(undefined)

export const TodoProvider: FC = ({ children }) => {
  const value = useTodoService()

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

export const useTodoContext = () => {
  const ctx = useContext(TodoContext)

  if (!ctx) throw new Error('No TodoContext found. Did you forget to set it up?')

  return ctx
}
