import './App.css'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import AppPage from './layouts/AppLayout';
import { createBrowserRouter, RouterProvider } from 'react-router'
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
    path: '/', element: <LoginPage />
  },{
    path: '/accounts/register', element: <RegisterPage />
  },{
    path: '/accounts/:userId', 
    element: <AppPage />,
    errorElement:<NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> }
    ]
  },{
    path: '*', element: <NotFoundPage />
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
