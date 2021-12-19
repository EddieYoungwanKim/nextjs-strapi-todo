import { FC } from 'react'

import { TodoProvider } from '../context/todo.context'

import { TodoForm } from './todo-form/todo-form.component'
import { TodoList } from './todo-list/todo-list.component'

// Todos: test
export const TodoContainer: FC = () => {
  return (
    <TodoProvider>
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
