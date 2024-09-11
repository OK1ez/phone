import React, { createContext, useContext, useState } from 'react'
import ReactDOM from 'react-dom'
import { cn } from '@/utils/misc'
import { motion, AnimatePresence } from 'framer-motion'

type DrawerContextType = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined)

function Drawer({ 
  children, 
}: { 
  children: React.ReactNode 
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DrawerContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </DrawerContext.Provider>
  )
}

function DrawerTrigger({ 
  className,
  children, 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
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

function DrawerContent({ className, children }: { className?: string, children: React.ReactNode }) {
  const context = useContext(DrawerContext)
  if (!context) throw new Error('DrawerContent must be used within a Drawer')

  const { isOpen, setIsOpen } = context

  const portalElement = typeof document !== 'undefined' ? document.getElementById('portal') : null

  if (!portalElement) {
    console.error("The element with id='portal' was not found.")
    return null
  }

  const content = (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className="fixed inset-0 z-30 bg-black/80 rounded-[3.5rem]"
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div 
            className={cn("absolute inset-x-0 bottom-0 z-40 px-6 pb-12 flex h-auto flex-col rounded-t-lg border-t bg-background", className)}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 250 }}
          >
            <button className='w-full h-10' onClick={() => setIsOpen(false)}>
              <div className="w-24 h-2 mx-auto rounded-full bg-muted" />
            </button>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )

  return ReactDOM.createPortal(content, portalElement)
}

export { Drawer, DrawerTrigger, DrawerContent }
