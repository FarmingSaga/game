import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from './components/ui/provider'
import { AppKitProvider } from './components/provider/appkit-provider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppKitProvider>
      <Provider>
        <App />
      </Provider>
    </AppKitProvider>
  </StrictMode>,
)
