import CssBaseline from '@mui/material/CssBaseline'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'

import { ThemeProviderWithColorMode } from '@/lib/theme'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <ThemeProviderWithColorMode>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProviderWithColorMode>
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default MyApp
