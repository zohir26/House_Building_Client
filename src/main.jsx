import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {

  RouterProvider,
} from "react-router-dom";
import router from './Router/Router.jsx';

import AuthProvider from './provider/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools /> */}
      <RouterProvider router = {router} />
    </QueryClientProvider>
    </AuthProvider>
    
  </StrictMode>,
)
