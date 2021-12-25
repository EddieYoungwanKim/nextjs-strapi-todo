import { TodoContainer } from '../components/todo.container'

import { render, screen } from '@/test-utils'

describe('TodoContainer', () => {
  it('renders a heading', () => {
    render(<TodoContainer />)

    const heading = screen.getByText('Todo')

    expect(heading).toBeInTheDocument()
  })
})
