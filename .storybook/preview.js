import { initialize, mswDecorator } from 'msw-storybook-addon'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()
initialize()

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    // material-ui theme provider
    <>
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    </>
  ),
  mswDecorator,
]
