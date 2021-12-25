import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'
import { rest } from 'msw'

import { TodoContainer } from '../components/todo.container'

export default {
  title: 'Example/TodoContainer',
  component: TodoContainer,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof TodoContainer>

const Template: ComponentStory<typeof TodoContainer> = (args) => <TodoContainer {...args} />

export const Primary = Template.bind({})

Primary.parameters = {
  msw: [
    rest.get('https://jsonplaceholder.typicode.com/todos', (req, res, ctx) => {
      return res(ctx.json({ todos: [{ id: 123, title: 'eddie' }] }))
    }),
  ],
}
