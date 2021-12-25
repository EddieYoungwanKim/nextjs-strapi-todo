import Box from '@mui/material/Box'
import type { NextPage } from 'next'

import { TodoContainer } from '../modules/todo/components/todo.container'

import { Layout } from '@/modules/common/components/layout.component'

const Home: NextPage = () => {
  return (
    <Layout>
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      ></Box>
      <TodoContainer />
    </Layout>
  )
}

export default Home
