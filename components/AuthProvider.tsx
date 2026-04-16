'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, saveUser, loadUser, clearUser } from '@/lib/auth'

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  isLoading: boolean
  login: (name: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = loadUser()
    setUser(storedUser)
    setIsLoading(false)
  }, [])

  const login = (name: string) => {
    const newUser = saveUser(name)
    setUser(newUser)
  }

  const logout = () => {
    clearUser()
    setUser(null)
  }

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoggedIn: user !== null, 
        isLoading,
        login, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
