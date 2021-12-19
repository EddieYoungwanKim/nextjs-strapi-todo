import { FC } from 'react'

import { SubmitHandler, useForm, useController } from 'react-hook-form'

import { Button } from '../../../common/components/button/button.component'
import { Input } from '../../../common/components/input/input.component'
import { useTodoContext } from '../../context/todo.context'

interface IFormInput {
  todo: string
}

export const TodoForm: FC = () => {
  const { submitTodo, fetchTodos } = useTodoContext()
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    submitTodo(data.todo)
  }

  return (
    <>
      <button onClick={fetchTodos}>refetch</button>
      <TodoFormPresenter onSubmitHandler={onSubmit} />
    </>
  )
}

/**
 * Todos:
 * 1. create story with addons
 * 2. testing - validation logic
 */
type TodoFormPresenterProps = {
  onSubmitHandler: (data: IFormInput) => void
  showError?: boolean
}

export const TodoFormPresenter: FC<TodoFormPresenterProps> = ({ onSubmitHandler, showError }) => {
  const { control, handleSubmit, reset } = useForm<IFormInput>()
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name: 'todo',
    control,
    rules: { required: 'required' },
    defaultValue: '',
  })
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    onSubmitHandler(data)

    reset({ todo: '' })
  }

  return (
    <>
      <div>Type Todos!</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input {...field} placeholder="todo" />
        <Button type="submit" label="Add" />
        <div>{showError && invalid && <>{error?.message}</>}</div>
      </form>
    </>
  )
}
