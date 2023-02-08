import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import ColumnDisplay from './layouts/ColumnDisplay'
import httpService from './services/httpClient'
import ExamCard from './components/ExamCard'
import Navbar from './layouts/Navbar'
import LoginView from './views/Login'
import Choices from './components/ui/Choices'
import ExamGroupCard from './components/ExamGroupCard'
import KeySheetForm from './layouts/KeySheetForm'
import ExamGroupForm from './layouts/ExamGroupForm'

import {
  Outlet,
  RouterProvider,
  RootRoute,
  Route, 
  ReactRouter,
  Link,
  useMatch,
} from '@tanstack/react-router'

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import ExamForm from './layouts/ExamForm'
import ExamGroupCreation from './views/ExamGroupCreation'
import KeySheetCreation from './views/KeySheetCreation'
import ExamCreationWizard from './views/ExamCreationWizard'

const rootRoute = new RootRoute({
  component: () => (
    <>
    <Outlet/>
    <Navbar/>
    </>
  ),
})

const indexRoute = new Route({
  getParentRoute: () => rootRoute, 
  path: '/'
})

const examWizardRoute = new Route({
  getParentRoute: () => rootRoute, 
  path: 'examwizard',
  component: ExamCreationWizard
})

const examGroupWizardRoute = new Route({
  getParentRoute: () => rootRoute, 
  path: 'examgroupwiz',
  component: ExamGroupCreation
})

const keySheetRoute = new Route({
  getParentRoute: () => rootRoute, 
  path: 'key',
  component: KeySheetCreation
})

const statsRoute = new Route({
  getParentRoute: () => rootRoute, 
  path: 'stats',
  component: () => (<></>)
})

const routeTree = rootRoute.addChildren([
  indexRoute, 
  examWizardRoute,
  examGroupWizardRoute,
  keySheetRoute,
  statsRoute,
])

const router = new ReactRouter({ routeTree })

const queryClient = new QueryClient()


function App() {
  return (
    <>
    <QueryClientProvider client={queryClient}>

      <RouterProvider
        router={router}
      />      

    </QueryClientProvider>
    </>
  )
}

export default App
