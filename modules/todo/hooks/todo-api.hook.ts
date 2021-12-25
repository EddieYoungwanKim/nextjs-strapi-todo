import axios from 'axios'
import keyBy from 'lodash/keyBy'
import { useQuery } from 'react-query'

import { Todo } from '../machine/todo.machine'

const fetchTodos = async () => {
  const { data } = await axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos')

  console.log('todo fetched')

  return data.slice(0, 4)
}

type Option = {
  disable?: boolean
  select?: (data: Todo[]) => any
}

export const mapById = (data: Todo[]) => {
  return keyBy(data, 'id')
}

export const uppercase = (data: Todo[]) => {
  console.log('recalculated')

  return data.map((todo) => ({ ...todo, title: todo.title.toUpperCase() }))
}

const defaultSelect = (data: Todo[]) => data

export const useTodoQuery = (option?: Option) => {
  const query = useQuery<Todo[]>('fetchTodos', fetchTodos, {
    enabled: !option?.disable,
    select: option?.select || defaultSelect,
  })

  return query
}
