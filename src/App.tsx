import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
/* import Login from './components/auth/Login' */
import Register from './components/auth/Register'
import NotFound from './components/404NotFound/404NotFound'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import ToDo from './components/todo/ToDo'
/* import {Sidebar} from './components/Layout/Sidebar' */
import { TasksTable } from './components/Layout/TasksTable'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    }
  }
});

const router = createBrowserRouter([
  {
    path: '/', element: <TasksTable></TasksTable>
  },{
    path: '/accounts/register', element: <Register></Register>
  },{
    path: '/accounts/:userId', element: <ToDo></ToDo>
  },{
    path: '*', element: <NotFound></NotFound>
  }
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  )
}

export default App
