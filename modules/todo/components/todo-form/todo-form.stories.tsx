import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'
import { screen, userEvent } from '@storybook/testing-library'

import { TodoFormPresenter } from './todo-form.component'

export default {
  title: 'Example/TodoForm',
  component: TodoFormPresenter,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof TodoFormPresenter>

const Template: ComponentStory<typeof TodoFormPresenter> = (args) => <TodoFormPresenter {...args} />

export const FilledForm = Template.bind({})

FilledForm.play = async () => {
  const todoInput = screen.getByPlaceholderText('todo')

  await userEvent.type(todoInput, 'test todo', {
    delay: 100,
  })

  const submitButton = screen.getByRole('button')

  await userEvent.click(submitButton)
}

export const InvalidForm = Template.bind({})

InvalidForm.args = {
  showError: true,
}

InvalidForm.play = async () => {
  const submitButton = screen.getByRole('button')

  await userEvent.click(submitButton)
}
