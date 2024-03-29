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
import StatsView from './views/StatsView'
import {enableMapSet} from "immer"
import { Toaster } from 'react-hot-toast'

const rootRoute = new RootRoute({
  component: () => (
    <>
      <div className='m-2 p-2 h-screen'>
        <Outlet/>
        <Navbar/>
      </div>
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

const examFormRoute = new Route({
  getParentRoute: () => rootRoute, 
  path: 'examform',
  component: ExamForm
})

const statsRoute = new Route({
  getParentRoute: () => rootRoute, 
  path: 'stats',
  component: StatsView
})

const routeTree = rootRoute.addChildren([
  indexRoute, 
  examWizardRoute,
  examGroupWizardRoute,
  keySheetRoute,
  statsRoute,
  examFormRoute,
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
    <Toaster />
    </>
  )
}

export default App
