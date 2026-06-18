import { Component } from 'react'

/**
 * ErrorBoundary — captura errores de renderizado de React
 * y muestra un mensaje amigable en lugar de una pantalla en blanco.
 *
 * Uso:
 *   <ErrorBoundary>
 *     <ComponenteQuePuedeFallar />
 *   </ErrorBoundary>
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // Puedes enviar el error a un servicio de monitoreo aquí
    console.error('[ErrorBoundary] Error atrapado:', error, info)
  }

  render() {
    if (this.state.hasError) {
      const { fallback } = this.props
      if (fallback) return fallback

      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            background: '#f8fafc',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div
            style={{
              maxWidth: 480,
              width: '100%',
              background: '#fff',
              borderRadius: 16,
              padding: '2.5rem',
              boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
              textAlign: 'center',
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                background: '#fef2f2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                fontSize: 32,
              }}
            >
              ⚠️
            </div>

            <h2
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#1e293b',
                marginBottom: '0.75rem',
              }}
            >
              Algo salió mal
            </h2>

            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Ocurrió un error inesperado al cargar esta sección. Por favor intenta
              recargar la página o navegar a otra sección.
            </p>

            {/* Error details (dev mode) */}
            {import.meta.env.DEV && this.state.error && (
              <details
                style={{
                  background: '#f1f5f9',
                  borderRadius: 8,
                  padding: '0.75rem 1rem',
                  marginBottom: '1.5rem',
                  textAlign: 'left',
                }}
              >
                <summary
                  style={{
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: '#ef4444',
                    marginBottom: '0.5rem',
                  }}
                >
                  Ver detalles del error
                </summary>
                <pre
                  style={{
                    fontSize: '0.75rem',
                    color: '#475569',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    margin: 0,
                  }}
                >
                  {this.state.error.toString()}
                </pre>
              </details>
            )}

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button
                onClick={() => window.location.reload()}
                style={{
                  padding: '0.6rem 1.5rem',
                  borderRadius: 8,
                  border: 'none',
                  background: '#0ea5e9',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                }}
              >
                Recargar página
              </button>
              <button
                onClick={() => (window.location.href = '/emprendedor')}
                style={{
                  padding: '0.6rem 1.5rem',
                  borderRadius: 8,
                  border: '1px solid #e2e8f0',
                  background: '#fff',
                  color: '#334155',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                }}
              >
                Ir al Dashboard
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
