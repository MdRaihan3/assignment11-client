import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Routes.jsx'
import { AnimatePresence } from 'framer-motion'
import AuthProvider from './provides/AuthProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>     
        <AnimatePresence>
          <RouterProvider router={router} />
        </AnimatePresence>
    </AuthProvider>
  </React.StrictMode>,
)
