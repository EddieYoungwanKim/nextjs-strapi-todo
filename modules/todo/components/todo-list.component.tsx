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
import { uppercase, useTodoQuery } from '../hooks/todo-api.hook'
// import { Todo } from '../machine/todo.machine'

export function TodoList() {
  const { data: todos } = useTodoQuery({ select: uppercase })
  const handleToggle = () => () => {
    //
  }

  return (
    <List>
      {todos?.map((todo) => {
        return (
          <ListItem
            key={todo.id}
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
                <DeleteIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle()} dense>
              <ListItemIcon>
                <Checkbox edge="start" checked={todo.completed} tabIndex={-1} disableRipple />
              </ListItemIcon>
              <ListItemText primary={todo.title} />
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  )
}
