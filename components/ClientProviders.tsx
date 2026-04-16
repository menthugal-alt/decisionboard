'use client'

import { ReactNode } from 'react'
import { AuthProvider } from './AuthProvider'
import { LoginModal } from './LoginModal'

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <LoginModal />
      {children}
    </AuthProvider>
  )
}
