import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SingInPage from './auth/signin/index.jsx'
import Home from './home/index.jsx'
import Dashboard from './dashboard/index.jsx'
import ViewResume from './my-resume/[resumeid]/view/index.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import EditResume from './dashboard/resume/[resumeid]/index.jsx'
// import { Import } from 'lucide-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const router = createBrowserRouter([
  {
    
    element: <App/>,
    children:[
     
      {
        path: '/dashboard',
        element:<Dashboard/>
      }
    ]
  },
  {
    path: '/dashboard/resume/:resumeId/edit',
    element: <EditResume/> 
  },
  {
    path: '/',
    element:<Home/>
     
  },
  {
    path: '/auth/signin',
    element:<SingInPage/>
  },
  
  {
    path: '/my-resume/:resumeId/view',
    element:<ViewResume/>
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
      </ClerkProvider>
  </React.StrictMode>,
)
