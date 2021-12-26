import axios from 'axios'
import { keyBy } from 'lodash'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { Todo } from '../machine/todo.machine'

type ResponseData = {
  id: string
  attributes: Todo
}

const fetchTodos = async () => {
  const { data } = await axios.get<{ data: ResponseData[] }>('http://localhost:1337/api/todos')

  console.log('todo fetched')

  return data.data
}
const postTodo = async (todo: Omit<Todo, 'id'>) => {
  const { data } = await axios.post<{ data: ResponseData }>('http://localhost:1337/api/todos', {
    data: todo,
  })

  return data.data
}
const deleteTodo = async (id: string) => {
  const { data } = await axios.delete<{ data: ResponseData }>(
    `http://localhost:1337/api/todos/${id}`
  )

  return data.data
}
const updateTodo = async (todo: Partial<Todo>) => {
  const { data } = await axios.put<{ data: ResponseData }>(
    `http://localhost:1337/api/todos/${todo.id}`,
    { data: todo }
  )

  return data.data
}

type Option = {
  disable?: boolean
  select?: (data: ResponseData[]) => ResponseData[]
}

export const mapById = (data: Todo[]) => keyBy(data, 'id')

export const uppercase = (data: Todo[]) => {
  return data.map((todo) => ({ ...todo, title: todo.title.toUpperCase() }))
}

export const defaultSelect = (data: ResponseData[]) => {
  return data.map((todo) => ({
    id: todo.id,
    attributes: {
      ...todo.attributes,
      title: todo.attributes.title.toUpperCase(),
    },
  }))
}

export const useTodoQuery = (option?: Option) => {
  return useQuery('fetchTodos', fetchTodos, {
    enabled: !option?.disable,
    select: option?.select || defaultSelect,
  })
}

export const useTodoMutate = () => {
  const queryClient = useQueryClient()

  return useMutation(postTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('fetchTodos')
    },
  })
}

export const useTodoDelete = () => {
  const queryClient = useQueryClient()

  return useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('fetchTodos')
    },
  })
}

export const useTodoUpdate = () => {
  const queryClient = useQueryClient()

  return useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('fetchTodos')
    },
  })
}
