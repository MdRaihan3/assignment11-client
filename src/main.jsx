import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Routes.jsx'
import { AnimatePresence } from 'framer-motion'
import AuthProvider from './provides/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <AnimatePresence>
          <RouterProvider router={router} />
        </AnimatePresence>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
