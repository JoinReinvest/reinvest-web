import { NextPage } from 'next'
import { MainLayout } from '../layouts/MainLayout'
import { logInIfNotAuthenticated } from '../services/authorization'

const Index: NextPage = () => {
  logInIfNotAuthenticated()

  return (
    <MainLayout>Dashboard Page</MainLayout>
  )
}

export default Index
