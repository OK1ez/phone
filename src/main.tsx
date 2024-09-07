import '@/styles/index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TailwindIndicator } from '@/components/tailwind-indicator.tsx'
import Phone from '@/components/os/phone.tsx'
import { ThemeProvider } from './components/theme-provider'
import { ModeToggle } from './components/mode-toggle'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className='flex flex-col items-center w-screen h-screen'>
        <Phone />
        <ModeToggle />
      </div>
      <TailwindIndicator />
    </ThemeProvider>
  </StrictMode>,
)
