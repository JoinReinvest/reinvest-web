import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export const logInIfNotAuthenticated = () => {
  const { status } = useSession()
  const router = useRouter()

  if (status !== 'authenticated') {
    router.push({
      pathname: '/login',
    })
  }
}
