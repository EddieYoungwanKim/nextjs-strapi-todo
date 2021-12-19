import axios from 'axios'
import { useQuery } from 'react-query'

import { Todo } from '../machine/todo.machine'

const fetchTodos = async () => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos')

  console.log('todo fetched', data)

  return data
}

type Option = {
  disable: boolean
}

export const useTodoApi = (option?: Option) => {
  const query = useQuery<Todo[]>('fetchTodos', fetchTodos, { enabled: !option?.disable })

  return query
}
