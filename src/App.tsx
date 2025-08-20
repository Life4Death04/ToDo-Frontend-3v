import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Register from './components/auth/Register'
import NotFound from './components/404NotFound/404NotFound'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import ToDo from './components/todo/ToDo'
import MainLayout from './components/Layout/MainLayout'

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
    path: '/', element: <MainLayout></MainLayout>
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
