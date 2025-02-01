import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Create a QueryClient instance
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
    document.getElementById('root')
)