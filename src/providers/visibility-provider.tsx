import { createContext, useContext, useState } from "react"

type VisibilityProviderProps = {
  children: React.ReactNode
}

type VisibilityContextType = {
  visible: boolean
  setVisibility: (value: boolean) => void
}

const VisibilityProviderContext = createContext<VisibilityContextType | undefined>(undefined)

export const VisibilityProvider: React.FC<VisibilityProviderProps> = ({ children }) => {
  const [visible, setVisibility] = useState(false)

  return (
    <VisibilityProviderContext.Provider value={{ visible, setVisibility }}>
      {children}
    </VisibilityProviderContext.Provider>
  )
}

export const useVisibility = (): VisibilityContextType => {
  const context = useContext(VisibilityProviderContext)

  if (context === undefined) {
    throw new Error("useVisibility must be used within a VisibilityProvider")
  }

  return context
}
