import { ReactNode } from 'react'

import type { NextPage } from 'next'

import { TodoContainer } from '../modules/todo/components/todo.container'

import { Layout } from '@/lib/design-system/components/layout.component'

type AuthConfig = {
  role: 'admin' | 'reader' | 'writer'
  loading: ReactNode
  redirectOnUnauthorized: string
}

const Home: NextPage & { auth: AuthConfig } = () => {
  return (
    <Layout>
      <TodoContainer />
    </Layout>
  )
}

export default Home

Home.auth = {
  role: 'admin',
  loading: <>Auth loading...</>,
  redirectOnUnauthorized: '/login', // redirect to this url
}
