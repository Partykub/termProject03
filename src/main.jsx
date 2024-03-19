import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Login from './components/login.jsx'
import Register from './components/register.jsx'
import Home from './components/home.jsx'
import ProtectedRoute from './auth/ProtectedRoute.jsx'
import Profile from './components/profile.jsx'


import { UserAuthContextProvider } from './context/userAuthContext.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <ProtectedRoute> <Home /> </ProtectedRoute>,
  },
  {
    path: "/profile",
    element: <ProtectedRoute> <Profile /> </ProtectedRoute>,
  },
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserAuthContextProvider>
      <RouterProvider router={router} />
    </UserAuthContextProvider>
  </React.StrictMode>,
)
