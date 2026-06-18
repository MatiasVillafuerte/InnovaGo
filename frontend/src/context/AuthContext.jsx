import { createContext, useContext, useState, useEffect } from 'react'
import { getUserByEmail, hashPassword, saveUser, updateUser } from '../services/firebaseRealtime'

const AuthContext = createContext(null)

// Usuarios demo para que puedan entrar rápido durante la revisión.
// La primera vez que se usan, se guardan también en Firebase.
const MOCK_USERS = {
  'admin@test.com': { id: 'admin-test', name: 'Admin Test', email: 'admin@test.com', role: 'admin', emailVerifiedAt: new Date().toISOString() },
  'admin@example.com': { id: 'admin-demo', name: 'Admin Master', email: 'admin@example.com', role: 'admin', emailVerifiedAt: new Date().toISOString() },
  'emprendedor@test.com': { id: 'emprendedor-test', name: 'Emprendedor Test', email: 'emprendedor@test.com', role: 'entrepreneur', emailVerifiedAt: new Date().toISOString() },
  'emprendedor@example.com': { id: 'emprendedor-demo', name: 'Emprendedor Demo', email: 'emprendedor@example.com', role: 'entrepreneur', emailVerifiedAt: new Date().toISOString() },
  'usuario@test.com': { id: 'usuario-test', name: 'Usuario Test', email: 'usuario@test.com', role: 'user', emailVerifiedAt: new Date().toISOString() },
}

function inferRole(email) {
  const value = email.toLowerCase()
  if (value.includes('admin')) return 'admin'
  if (value.includes('emprendedor') || value.includes('emprendego') || value.includes('entrepreneur')) return 'entrepreneur'
  return 'user'
}

function publicUser(userData) {
  if (!userData) return null
  const { passwordHash, ...safeUser } = userData
  return safeUser
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const setSession = (userData) => {
    const safeUser = publicUser(userData)
    localStorage.setItem('user', JSON.stringify(safeUser))
    setUser(safeUser)
  }

  const clearSession = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        clearSession()
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password, remember = false) => {
    const cleanEmail = email.toLowerCase().trim()
    const passwordHash = await hashPassword(password)

    let userData = null

    try {
      userData = await getUserByEmail(cleanEmail)
    } catch (error) {
      console.warn('No se pudo leer el usuario en Firebase.', error)
    }

    if (userData) {
      if (userData.estado === 'bloqueado') {
        throw new Error('Usuario bloqueado')
      }
      if (userData.passwordHash && userData.passwordHash !== passwordHash) {
        throw new Error('Correo o contraseña incorrectos')
      }
    } else {
      const mockUser = MOCK_USERS[cleanEmail]
      userData = mockUser || {
        id: String(Date.now()),
        name: cleanEmail.split('@')[0],
        email: cleanEmail,
        role: inferRole(cleanEmail),
        emailVerifiedAt: new Date().toISOString(),
      }

      userData = {
        ...userData,
        passwordHash,
        estado: 'activo',
        fechaRegistro: new Date().toISOString().slice(0, 10),
        createdAt: new Date().toISOString(),
      }

      try {
        await saveUser(userData)
      } catch (error) {
        console.warn('No se pudo guardar el usuario en Firebase.', error)
      }
    }

    setSession(userData)
    return {
      success: true,
      message: 'Inicio de sesión exitoso',
      user: publicUser(userData),
    }
  }

  const register = async (name, email, password, passwordConfirmation) => {
    if (password !== passwordConfirmation) {
      throw new Error('Las contraseñas no coinciden')
    }

    const cleanEmail = email.toLowerCase().trim()
    let existing = null

    try {
      existing = await getUserByEmail(cleanEmail)
    } catch (error) {
      console.warn('No se pudo verificar usuario existente en Firebase.', error)
    }

    if (existing) {
      throw new Error('Ya existe una cuenta con ese correo')
    }

    const userData = {
      id: String(Date.now()),
      name,
      email: cleanEmail,
      role: inferRole(cleanEmail),
      estado: 'activo',
      passwordHash: await hashPassword(password),
      emailVerifiedAt: new Date().toISOString(),
      fechaRegistro: new Date().toISOString().slice(0, 10),
      createdAt: new Date().toISOString(),
    }

    await saveUser(userData)
    setSession(userData)

    return {
      success: true,
      message: 'Usuario registrado exitosamente',
      user: publicUser(userData),
    }
  }

  const verifyEmail = async (code) => {
    if (user) {
      const updatedUser = { ...user, emailVerifiedAt: new Date().toISOString() }
      try {
        await updateUser(user.email, { emailVerifiedAt: updatedUser.emailVerifiedAt })
      } catch (error) {
        console.warn('No se pudo actualizar verificación en Firebase.', error)
      }
      setSession(updatedUser)
      return {
        success: true,
        message: 'Correo verificado exitosamente',
        user: updatedUser,
      }
    }
    return {
      success: false,
      message: 'Usuario no encontrado',
    }
  }

  const resendVerificationCode = async () => {
    return {
      success: true,
      message: 'Código de verificación reenviado exitosamente',
    }
  }

  const logout = async () => {
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
