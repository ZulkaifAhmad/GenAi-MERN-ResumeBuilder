import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Signup from './features/auth/Signup.jsx'
import Login from './features/auth/Login.jsx'
import Layout from './features/pages/Layout.jsx'
import {createBrowserRouter , RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
  {
    path : "/" ,
    element : <Layout />,
    children : [
      {
        index : true ,
        element : <App />
      },
      {
        path : "/login" ,
        element : <Login />
      },
      {
        path : "/signup" ,
        element : <Signup />
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
