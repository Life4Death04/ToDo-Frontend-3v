import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import NotFound from './components/404NotFound/404NotFound'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

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
    path: '/', element: <Login></Login>
  },{
    path: '/accounts/register', element: <Register></Register>
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
