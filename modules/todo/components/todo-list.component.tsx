import { FC } from 'react'

import { useTodo } from '../context/todo.context'
import { useTodoQuery } from '../hooks/todo-api.hook'
import type { Todo } from '../machine/todo.machine'

import { Button } from '@/modules/common/components/button.component'

const TodoItem: FC<{ todo: Todo }> = ({ todo }) => {
  const { deleteTodo, doneTodo } = useTodo()

  return (
    <div>
      {todo.completed ? (
        <span style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>
          {todo.title}
        </span>
      ) : (
        <>{todo.title}</>
      )}

      <Button
        label="delete"
        onClick={() => {
          deleteTodo(todo.id)
        }}
      />
      <Button
        label="done"
        onClick={() => {
          doneTodo(todo.id)
        }}
      />
    </div>
  )
}

export const TodoList = () => {
  // const { todos } = useTodoContext()
  const { data: todos } = useTodoQuery()

  return (
    <>
      {todos?.map((todo, i) => (
        <TodoItem key={i} todo={todo} />
      ))}
    </>
  )
}