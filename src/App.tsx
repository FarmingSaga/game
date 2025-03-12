import { Stack } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/router'
import { Toaster } from './components/ui/toaster'

function App() {
  return (
    <Stack height={'100vh'}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
      <Toaster />
    </Stack>
  )
}

export default App;
