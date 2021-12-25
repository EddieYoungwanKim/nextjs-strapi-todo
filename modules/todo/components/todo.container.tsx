import { FC } from 'react'

import { Typography } from '@mui/material'

import { TodoProvider } from '../context/todo.context'

import { TodoForm } from './todo-form.component'
import { TodoList } from './todo-list.component'

// Todos: test
export const TodoContainer: FC = () => {
  return (
    <TodoProvider>
      <TodoTemplate>
        <Typography variant="h5" align="center" color="text.primary" gutterBottom>
          Add Todos
        </Typography>
        <TodoForm />
        <TodoList />
      </TodoTemplate>
    </TodoProvider>
  )
}

const TodoTemplate: FC = ({ children }) => {
  return <>{children}</>
}
