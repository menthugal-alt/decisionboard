'use client'

import { useState, useRef, useEffect } from 'react'
import { useAuth } from './AuthProvider'
import { GraduationCap, ArrowRight } from 'lucide-react'

export function LoginModal() {
  const { login, isLoggedIn, isLoading } = useAuth()
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isLoggedIn && !isLoading && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isLoggedIn, isLoading])

  if (isLoading || isLoggedIn) {
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const trimmedName = name.trim()
    if (trimmedName.length < 2) {
      setError('Please enter your name (at least 2 characters)')
      return
    }
    
    setError('')
    login(trimmedName)
  }

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-bosch-gray-900 to-bosch-gray-800 flex flex-col">
      {/* Safe area top padding for iOS */}
      <div className="flex-1 flex flex-col justify-center px-6 pb-safe">
        <div className="w-full max-w-sm mx-auto">
          {/* Logo and branding */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-bosch-red rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Decision Lab
            </h1>
            <p className="text-bosch-gray-400 text-base sm:text-lg">
              Bosch PM Training Simulator
            </p>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="name" 
                className="block text-sm font-medium text-bosch-gray-300 mb-2"
              >
                Enter your name to begin
              </label>
              <input
                ref={inputRef}
                id="name"
                type="text"
                inputMode="text"
                autoComplete="name"
                autoCapitalize="words"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  if (error) setError('')
                }}
                placeholder="Your name"
                className="w-full h-14 px-4 text-lg rounded-xl border-2 border-bosch-gray-600 bg-bosch-gray-800 text-white placeholder-bosch-gray-500 focus:border-bosch-red focus:outline-none focus:ring-2 focus:ring-bosch-red/20 transition-colors"
              />
              {error && (
                <p className="mt-2 text-sm text-red-400">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full h-14 bg-bosch-red hover:bg-bosch-red/90 active:bg-bosch-red/80 text-white font-semibold text-lg rounded-xl flex items-center justify-center gap-2 transition-colors touch-manipulation"
            >
              Start Training
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Footer text */}
          <p className="text-center text-bosch-gray-500 text-sm mt-8">
            Your progress will be saved locally on this device
          </p>
        </div>
      </div>

      {/* Bottom safe area for iOS */}
      <div className="h-safe" />
    </div>
  )
}
