import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const setSession = (token, userData) => {
    localStorage.setItem('token', token)
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
    setUser(userData)
  }

  const clearSession = () => {
    localStorage.removeItem('token')
    delete axios.defaults.headers.common.Authorization
    setUser(null)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    }
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const response = await axios.get('/api/user')
        setUser(response.data)
      } catch (error) {
        clearSession()
      }
    }
    setLoading(false)
  }

  const login = async (email, password, remember = false) => {
    const response = await axios.post('/api/login', { email, password, remember })
    const { token, user: userData } = response.data
    if (token) {
      setSession(token, userData)
    }
    return response.data
  }

  const register = async (name, email, password, passwordConfirmation) => {
    const response = await axios.post('/api/register', {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation
    })
    const { token, user: userData } = response.data
    if (token) {
      setSession(token, userData)
    }
    return response.data
  }

  const verifyEmail = async (code) => {
    const response = await axios.post('/api/verify-email', { code })
    if (response.data.success) {
      setUser(response.data.user)
    }
    return response.data
  }

  const resendVerificationCode = async () => {
    const response = await axios.post('/api/resend-verification')
    return response.data
  }

  const logout = async () => {
    try {
      await axios.post('/api/logout')
    } catch (error) {
      console.error('Logout error:', error)
    }
    clearSession()
  }

  const value = {
    user,
    loading,
    login,
    register,
    verifyEmail,
    resendVerificationCode,
    logout,
    checkAuth
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
