import { defineStore } from 'pinia'
import { ApiError, apiErrorMessage } from '~/composables/useApi'
import type { User, RegisterData } from '~/types'

const ACCESS_KEY = 'auth_token'
const REFRESH_KEY = 'auth_refresh_token'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    refreshToken: null as string | null,
    isAuthenticated: false,
    loading: false,
    error: null as string | null,
    /** true เมื่อ bootstrap ตอนเปิดแอปเสร็จแล้ว — กัน middleware เด้งออกก่อนรู้ผล */
    ready: false,
  }),

  getters: {
    isLoggedIn: (state) => state.isAuthenticated,
    currentUser: (state) => state.user,
  },

  actions: {
    setTokens(accessToken: string, refreshToken: string) {
      this.token = accessToken
      this.refreshToken = refreshToken
      if (typeof window === 'undefined') return
      localStorage.setItem(ACCESS_KEY, accessToken)
      localStorage.setItem(REFRESH_KEY, refreshToken)
    },

    clearTokens() {
      this.token = null
      this.refreshToken = null
      this.user = null
      this.isAuthenticated = false
      if (typeof window === 'undefined') return
      localStorage.removeItem(ACCESS_KEY)
      localStorage.removeItem(REFRESH_KEY)
    },

    /**
     * bootstrap ตอนเปิดแอป — อ่าน token จาก localStorage แล้ว **ถาม server ว่าเราเป็นใคร**
     */
    async restore(): Promise<boolean> {
      if (typeof window === 'undefined') return false

      const token = localStorage.getItem(ACCESS_KEY)
      const refresh = localStorage.getItem(REFRESH_KEY)

      if (!token) {
        this.ready = true
        return false
      }

      this.token = token
      this.refreshToken = refresh

      try {
        this.user = await useApi().get<User>('/me')
        this.isAuthenticated = true
        return true
      } catch {
        // useApi พยายาม refresh ให้แล้วก่อนจะโยนออกมา — ถึงตรงนี้คือกู้ไม่ได้จริง
        this.clearTokens()
        return false
      } finally {
        this.ready = true
      }
    },

    /** ต่ออายุ access token — เรียกจาก useApi ตอนเจอ 401 (อย่าเรียกเองจากหน้า) */
    async refreshSession(): Promise<boolean> {
      if (!this.refreshToken) return false

      try {
        const data = await useApi().post<{ accessToken: string; refreshToken: string }>(
          '/auth/refresh',
          { refreshToken: this.refreshToken },
          { auth: false },
        )
        this.setTokens(data.accessToken, data.refreshToken)
        return true
      } catch {
        return false
      }
    },

    async login(username: string, password: string, rememberMe = false) {
      this.loading = true
      this.error = null

      try {
        const data = await useApi().post<{ accessToken: string; refreshToken: string; user: User }>(
          '/auth/login',
          { username, password, rememberMe },
          { auth: false },
        )

        this.setTokens(data.accessToken, data.refreshToken)
        this.user = data.user
        this.isAuthenticated = true
        this.ready = true

        return true
      } catch (err) {
        this.error = apiErrorMessage(err)

        // login ผิดพลาดคืนจำนวนครั้งที่เหลือมาด้วย ต่อท้ายให้ผู้ใช้เห็นว่าเหลืออีกกี่ครั้ง
        if (err instanceof ApiError && err.code === 'INVALID_CREDENTIALS') {
          const remaining = err.detail('remainingAttempts')
          const max = err.detail('maxAttempts')
          if (remaining && max) {
            this.error += ` (เหลืออีก ${remaining} จาก ${max} ครั้ง)`
          }
        }

        return false
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        await useApi().post('/auth/logout', { refreshToken: this.refreshToken ?? undefined })
      } catch {
        // server ตอบ 200 เสมอ ถึงพลาดก็ต้องล้างฝั่ง client อยู่ดี
      } finally {
        this.clearTokens()
      }
    },

    async register(registerData: RegisterData) {
      this.loading = true
      this.error = null

      try {
        const data = await useApi().post<{ accessToken: string; refreshToken: string; user: User }>(
          '/auth/register',
          registerData,
          { auth: false },
        )

        this.setTokens(data.accessToken, data.refreshToken)
        this.user = data.user
        this.isAuthenticated = true
        this.ready = true

        return true
      } catch (err) {
        this.error = apiErrorMessage(err)
        return false
      } finally {
        this.loading = false
      }
    },

    /** เซสชันกู้ไม่ได้แล้ว — ล้างทิ้งแล้วส่งกลับหน้า login (เรียกจาก useApi) */
    async forceLogout() {
      this.clearTokens()
      if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
        await navigateTo('/login')
      }
    },

    async forgotPassword(email: string) {
      this.loading = true
      this.error = null
      try {
        await useApi().post('/auth/forgot-password', { email }, { auth: false })
        return true
      } catch (err) {
        this.error = apiErrorMessage(err)
        return false
      } finally {
        this.loading = false
      }
    },

    async resetPassword(token: string, newPassword: string) {
      this.loading = true
      this.error = null
      try {
        await useApi().post('/auth/reset-password', { token, newPassword }, { auth: false })
        return true
      } catch (err) {
        this.error = apiErrorMessage(err)
        return false
      } finally {
        this.loading = false
      }
    },

    /** โหลดโปรไฟล์ตัวเองใหม่ — ใช้หลังแก้ชื่อ/รูปในหน้า /account */
    async reloadMe() {
      this.user = await useApi().get<User>('/me')
    },
  },
})

/*const mockInfluencer: User = {
  id: '1',
  username: 'influencer_demo',
  email: 'demo@kolplatform.com',
  firstName: 'สมชาย',
  lastName: 'ใจดี',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  //role: 'influencer',
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
})*/
