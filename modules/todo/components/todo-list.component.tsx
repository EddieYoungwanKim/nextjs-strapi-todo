// import { useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

// import { useTodo } from '../context/todo.context'
import { useTodoDelete, useTodoQuery, useTodoUpdate } from '../hooks/todo-api.hook'
import { Todo } from '../machine/todo.machine'
// import { Todo } from '../machine/todo.machine'

export function TodoList() {
  const { data: todos } = useTodoQuery()
  const { mutate: deleteTodo } = useTodoDelete()
  const { mutate: updateTodo } = useTodoUpdate()
  const handleToggle = (todo: Partial<Todo>) => {
    updateTodo(todo)
  }

  return (
    <List>
      {todos?.map((todo) => {
        return (
          <ListItem
            key={todo.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="comments"
                onClick={() => {
                  deleteTodo(todo.id)
                }}
              >
                <DeleteIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton
              role={undefined}
              onClick={() => {
                handleToggle({ id: todo.id, isComplete: !todo.attributes.isComplete })
              }}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={todo.attributes.isComplete}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary={todo.attributes.title} />
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  )
}
