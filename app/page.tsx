'use client'

import { ModuleCard } from '@/components/ModuleCard'
import { scenarioModules } from '@/data/scenarios'
import { loadProgress } from '@/lib/scoring'
import { useEffect, useState } from 'react'
import { UserProgress } from '@/types/scenario'
import { useAuth } from '@/components/AuthProvider'
import { 
  GraduationCap, 
  Target, 
  TrendingUp, 
  Award,
  ChevronRight,
  BarChart3,
  LogOut,
  User
} from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const { user, logout, isLoggedIn } = useAuth()
  const [progress, setProgress] = useState<UserProgress[]>([])

  useEffect(() => {
    if (isLoggedIn) {
      setProgress(loadProgress())
    }
  }, [isLoggedIn])

  const getCompletedCount = (moduleId: string) => {
    return progress.filter(p => p.moduleId === moduleId && p.completed).length
  }

  const totalCompleted = progress.filter(p => p.completed).length
  const totalScenarios = scenarioModules.reduce((acc, m) => acc + m.scenarios.length, 0)


  return (
    <div className="min-h-screen bg-gradient-to-b from-bosch-gray-50 to-white">
      <header className="bg-white border-b border-bosch-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo - compact on mobile */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-bosch-red rounded-lg flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-bosch-gray-900">Decision Lab</h1>
                <p className="text-xs text-bosch-gray-500">Bosch PM Training Simulator</p>
              </div>
              <h1 className="sm:hidden text-base font-bold text-bosch-gray-900">Decision Lab</h1>
            </div>

            {/* Right side: User info and actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Dashboard link - icon only on mobile */}
              <Link
                href="/dashboard"
                className="flex items-center gap-1 sm:gap-2 text-sm text-bosch-blue-600 hover:text-bosch-blue-700 font-medium min-h-[44px] px-2 sm:px-3"
              >
                <BarChart3 className="w-5 h-5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>

              {/* User info and logout */}
              {user && (
                <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-3 border-l border-bosch-gray-200">
                  {/* User avatar and name */}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-bosch-blue-100 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-bosch-blue-600" />
                    </div>
                    <span className="hidden sm:block text-sm font-medium text-bosch-gray-700 max-w-[120px] truncate">
                      {user.name}
                    </span>
                  </div>

                  {/* Logout button */}
                  <button
                    onClick={logout}
                    className="flex items-center justify-center gap-1 text-sm text-bosch-gray-500 hover:text-bosch-red min-h-[44px] min-w-[44px] sm:min-w-0 sm:px-2 transition-colors"
                    title="Sign out"
                  >
                    <LogOut className="w-5 h-5 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Sign out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="mb-12">
          <div className="bg-gradient-to-r from-bosch-blue-600 to-bosch-blue-700 rounded-2xl p-8 text-white">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                {user ? `Welcome, ${user.name}` : 'Welcome to Decision Lab'}
              </h2>
              <p className="text-bosch-blue-100 text-lg mb-6">
                Develop your leadership and project management skills through interactive 
                scenario-based training. Make decisions, see consequences, and learn from 
                real-world situations.
              </p>
              
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white/10 rounded-xl p-4">
                  <Target className="w-8 h-8 mb-2 text-bosch-blue-200" />
                  <div className="text-2xl font-bold">{scenarioModules.length}</div>
                  <div className="text-sm text-bosch-blue-200">Training Modules</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <TrendingUp className="w-8 h-8 mb-2 text-bosch-blue-200" />
                  <div className="text-2xl font-bold">{totalCompleted}/{totalScenarios}</div>
                  <div className="text-sm text-bosch-blue-200">Completed</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <Award className="w-8 h-8 mb-2 text-bosch-blue-200" />
                  <div className="text-2xl font-bold">4</div>
                  <div className="text-sm text-bosch-blue-200">Competencies</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-bosch-gray-900">Training Modules</h2>
              <p className="text-bosch-gray-500 mt-1">
                Select a module to begin your training journey
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {scenarioModules.map(module => (
              <ModuleCard 
                key={module.id}
                module={module}
                completedScenarios={getCompletedCount(module.id)}
              />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="bg-bosch-gray-50 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-bosch-gray-900 mb-4">
              How It Works
            </h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-bosch-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-bosch-blue-600">1</span>
                </div>
                <h3 className="font-semibold text-bosch-gray-900 mb-1">Choose a Module</h3>
                <p className="text-sm text-bosch-gray-500">Select a training area that matches your development goals</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-bosch-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-bosch-blue-600">2</span>
                </div>
                <h3 className="font-semibold text-bosch-gray-900 mb-1">Read the Scenario</h3>
                <p className="text-sm text-bosch-gray-500">Immerse yourself in realistic project management situations</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-bosch-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-bosch-blue-600">3</span>
                </div>
                <h3 className="font-semibold text-bosch-gray-900 mb-1">Make Decisions</h3>
                <p className="text-sm text-bosch-gray-500">Choose your response and see how it impacts outcomes</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-bosch-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-bosch-blue-600">4</span>
                </div>
                <h3 className="font-semibold text-bosch-gray-900 mb-1">Learn & Improve</h3>
                <p className="text-sm text-bosch-gray-500">Review feedback and try different approaches</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="bg-white border border-bosch-gray-200 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-bosch-gray-900 mb-4">
              Competency Framework
            </h2>
            <p className="text-bosch-gray-600 mb-6">
              Your performance is evaluated across four key leadership dimensions:
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-1">Leadership Style</h3>
                <p className="text-sm text-blue-700">How effectively you demonstrate leadership qualities and inspire your team</p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <h3 className="font-semibold text-green-900 mb-1">Business Impact</h3>
                <p className="text-sm text-green-700">Your decisions&apos; effect on project outcomes and organizational goals</p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                <h3 className="font-semibold text-purple-900 mb-1">Team Health</h3>
                <p className="text-sm text-purple-700">How your choices affect team morale, engagement, and wellbeing</p>
              </div>
              
              <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                <h3 className="font-semibold text-orange-900 mb-1">Risk Management</h3>
                <p className="text-sm text-orange-700">Your ability to identify, assess, and mitigate project risks</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-bosch-gray-900 text-bosch-gray-400 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            Decision Lab - Bosch Leadership & Project Management Training
          </p>
          <p className="text-xs mt-2">
            An interactive learning experience for developing management skills
          </p>
        </div>
      </footer>
    </div>
  )
}
