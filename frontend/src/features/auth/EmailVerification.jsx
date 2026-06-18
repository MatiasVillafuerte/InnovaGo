import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Mail, Shield, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react'

const EmailVerification = () => {
  const navigate = useNavigate()
  const { verifyEmail, resendVerificationCode, user, loading: authLoading } = useAuth()
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    if (!authLoading && !localStorage.getItem('token')) {
      navigate('/login', { replace: true })
    }
  }, [authLoading, navigate])

  useEffect(() => {
    let timer
    if (countdown > 0 && !canResend) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    } else if (countdown === 0) {
      setCanResend(true)
    }
    return () => clearTimeout(timer)
  }, [countdown, canResend])

  const handleCodeChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return

    const newCode = [...code]
    newCode[index] = value.slice(-1) // Take only last character
    setCode(newCode)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`)
      if (nextInput) nextInput.focus()
    }

    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)
    if (/^\d+$/.test(pastedData)) {
      const newCode = [...code]
      pastedData.split('').forEach((char, i) => {
        if (i < 6) newCode[i] = char
      })
      setCode(newCode)
      // Focus the last filled input or the next empty one
      const nextIndex = Math.min(pastedData.length, 5)
      const nextInput = document.getElementById(`code-${nextIndex}`)
      if (nextInput) nextInput.focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const codeString = code.join('')
    if (codeString.length !== 6) {
      setError('Por favor ingresa el código completo de 6 dígitos')
      return
    }

    setLoading(true)
    setError('')

    try {
      const result = await verifyEmail(codeString)
      if (result.success) {
        setSuccess(true)
        setTimeout(() => {
          navigate('/dashboard')
        }, 1500)
      } else {
        setError(result.message || 'Código inválido. Intenta nuevamente.')
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error al verificar el código. Intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (!canResend) return

    setResendLoading(true)
    setError('')

    try {
      await resendVerificationCode()
      setCanResend(false)
      setCountdown(60)
      setCode(['', '', '', '', '', ''])
      // Focus first input
      const firstInput = document.getElementById('code-0')
      if (firstInput) firstInput.focus()
    } catch (error) {
      setError(error.response?.data?.message || 'Error al reenviar el código. Intenta nuevamente.')
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-slide-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
            <Mail className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Verifica tu Correo
          </h1>
          <p className="text-slate-600">
            Hemos enviado un código de 6 dígitos a tu correo electrónico
          </p>
          {user?.email && (
            <p className="text-sm text-slate-500 mt-1">
              {user.email}
            </p>
          )}
        </div>

        <div className="card">
          {success ? (
            <div className="text-center py-8 animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                ¡Verificación Exitosa!
              </h2>
              <p className="text-slate-600">
                Tu correo ha sido verificado correctamente.
              </p>
              <p className="text-sm text-slate-500 mt-4">
                Redirigiendo al dashboard...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 animate-fade-in">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-4 text-center">
                  Ingresa el código de verificación
                </label>
                <div className="flex gap-2 justify-center">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      className="w-12 h-12 text-center text-2xl font-bold border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      disabled={loading}
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={loading || code.join('').length !== 6}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="loading-spinner"></div>
                    Verificando...
                  </span>
                ) : (
                  'Verificar Código'
                )}
              </button>

              <div className="text-center">
                <p className="text-slate-600 mb-2">
                  ¿No recibiste el código?
                </p>
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={resendLoading}
                    className="text-primary-600 hover:text-primary-700 font-medium transition-colors flex items-center justify-center gap-2 mx-auto"
                  >
                    {resendLoading ? (
                      <>
                        <div className="loading-spinner h-4 w-4 border-primary-600"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4" />
                        Reenviar Código
                      </>
                    )}
                  </button>
                ) : (
                  <p className="text-sm text-slate-500">
                    Reenviar en {countdown} segundos
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-start gap-2 text-sm text-slate-600">
                  <Shield className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <p>
                    Por tu seguridad, debes verificar tu correo electrónico antes de acceder a tu cuenta.
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            ← Volver al inicio de sesión
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EmailVerification
