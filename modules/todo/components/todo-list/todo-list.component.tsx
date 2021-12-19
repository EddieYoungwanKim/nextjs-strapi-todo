import { FC } from 'react'

import { Button } from '../../../common/components/button/button.component'
import { useTodoContext } from '../../context/todo.context'
import { useTodoApi } from '../../hooks/todo-api.hook'
import type { Todo } from '../../machine/todo.machine'

const TodoItem: FC<{ todo: Todo }> = ({ todo }) => {
  const { deleteTodo, doneTodo } = useTodoContext()

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
  const { data: todos } = useTodoApi()

  return (
    <>
      {todos?.map((todo, i) => (
        <TodoItem key={i} todo={todo} />
      ))}
    </>
  )
}
