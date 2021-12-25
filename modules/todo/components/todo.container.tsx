import { FC } from 'react'

import { TodoProvider } from '../context/todo.context'

import { TodoForm } from './todo-form.component'
import { TodoList } from './todo-list.component'

// Todos: test
export const TodoContainer: FC = () => {
  return (
    <TodoProvider>
      <h1>Todo</h1>
      <TodoTemplate>
        <TodoForm></TodoForm>
        <TodoList />
      </TodoTemplate>
    </TodoProvider>
  )
}

const TodoTemplate: FC = ({ children }) => {
  return <>{children}</>
}
