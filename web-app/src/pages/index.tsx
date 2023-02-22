import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { Link } from '../components/Link'
import { URL } from '../constants/urls'

import { MainLayout } from '../layouts/MainLayout'

const Index: NextPage = () => {
  console.log(useSession())
  return <MainLayout>
    <Link title="Logout" href={URL.logout}>LogOut</Link>
  </MainLayout>
}

export default Index
