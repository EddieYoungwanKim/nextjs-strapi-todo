import { FC } from 'react'

import { Box, Container } from '@mui/material'

import { AppBar } from './appbar.component'

export const Layout: FC = ({ children }) => {
  return (
    <>
      <AppBar />
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 2,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">{children}</Container>
        </Box>
      </main>
    </>
  )
}
