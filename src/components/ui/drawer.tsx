import React, { createContext, useContext, useState } from 'react'
import ReactDOM from 'react-dom'
import { cn } from '@/utils/misc'

type DrawerContextType = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined)

const Drawer = ({ 
  children, 
}: { 
  children: React.ReactNode 
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DrawerContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </DrawerContext.Provider>
  )
}

const DrawerTrigger: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  children, 
  ...props 
}) => {
  const context = useContext(DrawerContext)
  if (!context) throw new Error('DrawerTrigger must be used within a Drawer')

  return (
    <button 
      className={className}
      onClick={() => context.setIsOpen(true)} 
      {...props}
    >
      {children}
    </button>
  )
}

const DrawerContent: React.FC<{ className?: string, children: React.ReactNode }> = ({ className, children }) => {
  const context = useContext(DrawerContext)
  if (!context) throw new Error('DrawerContent must be used within a Drawer')

  const { isOpen, setIsOpen } = context

  const portalElement = document.getElementById('portal')

  if (!portalElement) {
    console.error("The element with id='portal' was not found.")
    return null
  }

  const content = isOpen && (
    <>
      <div 
        className="fixed inset-0 z-30 bg-black/80 rounded-[3.5rem]"
        onClick={() => setIsOpen(false)}
      />
        <div className={cn("absolute inset-x-0 bottom-0 z-40 px-4 pb-12 flex h-auto flex-col rounded-t-lg border-t bg-background", className)}>
          <button className='w-full h-10' onClick={() => setIsOpen(false)}>
            <div className="w-24 h-2 mx-auto rounded-full bg-muted" />
          </button>
          {children}
        </div>
    </>
  )

  return ReactDOM.createPortal(content, portalElement)
}

export { Drawer, DrawerTrigger, DrawerContent }
