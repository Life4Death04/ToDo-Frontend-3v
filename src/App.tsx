import './App.css'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import UserProfilePage from './pages/UserProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import AppPage from './pages/AppPage';
import { createBrowserRouter, RouterProvider } from 'react-router'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { SettingsProvider } from './contexts/SettingsContext';
import { ListPage } from './pages/ListPage';
import ArchiveTasksPage from './pages/ArchiveTasksPage';

import {SettingsContainer} from './containers/SettingsContainer';

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
      { index: true, element: <HomePage /> },
      {
        path: 'lists/:id',
        element: <ListPage />
      },{
        path: 'profile',
        element: <UserProfilePage />
      },{
        path: 'archive',
        element: <ArchiveTasksPage />
      },{
        path: 'settings',
        element: <SettingsContainer />
      }
    ]
  },{
    path: '*', element: <NotFoundPage />
  }
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <RouterProvider router={router}></RouterProvider>
      </SettingsProvider>
    </QueryClientProvider>
  )
}

export default App
