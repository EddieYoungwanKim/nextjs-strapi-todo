import { keyBy } from 'lodash'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { Todo } from '../machine/todo.machine'

import { http } from '@/core/http'

type ResponseData = {
  id: string
  attributes: Todo
}

const fetchTodos = async () => {
  const { data } = await http.get<{ data: ResponseData[] }>('/todos')

  console.log('todo fetched')

  return data.data
}
const postTodo = async (todo: Omit<Todo, 'id'>) => {
  const { data } = await http.post<{ data: ResponseData }>('/todos', {
    data: todo,
  })

  return data.data
}
const deleteTodo = async (id: string) => {
  const { data } = await http.delete<{ data: ResponseData }>(`/todos/${id}`)

  return data.data
}
const updateTodo = async (todo: Partial<Todo>) => {
  const { data } = await http.put<{ data: ResponseData }>(`/todos/${todo.id}`, { data: todo })

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
