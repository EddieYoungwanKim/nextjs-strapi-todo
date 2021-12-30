import { FC, useEffect } from 'react'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export const AuthGuard: FC = ({ children }) => {
  const { data, status } = useSession()
  const router = useRouter()
  const isUser = !!data?.user

  useEffect(() => {
    if (status === 'loading') return // Do nothing while loading
    if (!isUser) router.push('/login') // If not authenticated, force log in
  }, [isUser, status])

  if (isUser) return <>{children}</>

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return null
}
