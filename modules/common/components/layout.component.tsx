import { FC } from 'react'

import Container from '@mui/material/Container'

import { AppBar } from './appbar.component'

export const Layout: FC = ({ children }) => {
  return (
    <>
      <AppBar />
      <Container maxWidth="lg">
        <div>{children}</div>
      </Container>
    </>
  )
}
