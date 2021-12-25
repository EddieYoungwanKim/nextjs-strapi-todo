import type { NextPage } from 'next'

import { TodoContainer } from '../modules/todo/components/todo.container'

import { Layout } from '@/modules/common/components/layout.component'

const Home: NextPage = () => {
  return (
    <Layout>
      <TodoContainer />
    </Layout>
  )
}

export default Home
