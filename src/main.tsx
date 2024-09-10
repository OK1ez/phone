import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TailwindIndicator } from '@/components/tailwind-indicator.tsx'
import { ModeToggle } from './components/mode-toggle'
import { VisibilityProvider } from './providers/visibility-provider'
import { ThemeProvider } from './providers/theme-provider'
import Phone from '@/components/os/phone.tsx'
import './globals.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className='flex flex-col items-center w-screen h-screen'>
        <VisibilityProvider>
          <Phone />
        </VisibilityProvider>
        <ModeToggle />
      </div>
      <TailwindIndicator />
    </ThemeProvider>
  </StrictMode>,
)
