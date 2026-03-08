import { defineStore } from 'pinia'
import type { User, LoginCredentials, RegisterData } from '~/types'

const mockInfluencer: User = {
  id: '1',
  username: 'influencer_demo',
  email: 'demo@kolplatform.com',
  firstName: 'สมชาย',
  lastName: 'ใจดี',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  role: 'influencer',
  status: 'approved',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)
  const isLoading = ref(true)

  function init() {
    if (import.meta.client) {
      const storedUser = localStorage.getItem('kol_user')
      if (storedUser) {
        try {
          user.value = JSON.parse(storedUser)
          isAuthenticated.value = true
        } catch {
          localStorage.removeItem('kol_user')
        }
      }
      isLoading.value = false
    }
  }

  async function login(credentials: LoginCredentials) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    if (credentials.username && credentials.password) {
      user.value = mockInfluencer
      isAuthenticated.value = true
      if (import.meta.client) {
        localStorage.setItem('kol_user', JSON.stringify(mockInfluencer))
      }
    } else {
      throw new Error('Invalid credentials')
    }
  }

  async function loginWithSocial(provider: 'facebook' | 'google' | 'tiktok') {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const socialUser = { ...mockInfluencer, email: `${provider}@kolplatform.com` }
    user.value = socialUser
    isAuthenticated.value = true
    if (import.meta.client) {
      localStorage.setItem('kol_user', JSON.stringify(socialUser))
    }
  }

  async function register(data: RegisterData) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: 'influencer',
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    user.value = newUser
    isAuthenticated.value = true
    if (import.meta.client) {
      localStorage.setItem('kol_user', JSON.stringify(newUser))
    }
  }

  function logout() {
    user.value = null
    isAuthenticated.value = false
    if (import.meta.client) {
      localStorage.removeItem('kol_user')
    }
  }

  async function forgotPassword(email: string) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Password reset email sent to:', email)
  }

  async function resetPassword(token: string, _newPassword: string) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Password reset with token:', token)
  }

  async function changePassword(_oldPassword: string, _newPassword: string) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Password changed')
  }

  function updateUser(userData: Partial<User>) {
    if (user.value) {
      user.value = { ...user.value, ...userData }
      if (import.meta.client) {
        localStorage.setItem('kol_user', JSON.stringify(user.value))
      }
    }
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    init,
    login,
    loginWithSocial,
    register,
    logout,
    forgotPassword,
    resetPassword,
    changePassword,
    updateUser,
  }
})
