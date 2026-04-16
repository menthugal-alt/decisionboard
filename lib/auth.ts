export interface User {
  id: string
  name: string
  loggedInAt: string
}

const STORAGE_KEY = 'bosch-decision-lab-user'

function generateUserId(name: string): string {
  const timestamp = Date.now()
  const sanitizedName = name.toLowerCase().replace(/\s+/g, '-').slice(0, 20)
  return `${sanitizedName}-${timestamp}`
}

export function saveUser(name: string): User {
  const user: User = {
    id: generateUserId(name),
    name: name.trim(),
    loggedInAt: new Date().toISOString(),
  }
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  }
  
  return user
}

export function loadUser(): User | null {
  if (typeof window === 'undefined') return null
  
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return null
  
  try {
    return JSON.parse(stored) as User
  } catch {
    return null
  }
}

export function clearUser(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY)
  }
}

export function isLoggedIn(): boolean {
  return loadUser() !== null
}
