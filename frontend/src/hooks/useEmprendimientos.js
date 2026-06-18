import { useCallback, useEffect, useState } from 'react'
import { emprendimientos as seedEmprendimientos, categorias as seedCategorias } from '../data/emprendimientos'
import { getCategorias, getEmprendimientos } from '../services/firebaseRealtime'

export function useEmprendimientos({ includePending = false } = {}) {
  const [refreshKey, setRefreshKey] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [emprendimientos, setEmprendimientos] = useState(() => {
    return includePending
      ? seedEmprendimientos
      : seedEmprendimientos.filter((item) => !item.estado || item.estado === 'aprobado')
  })
  const [categorias, setCategorias] = useState(() => seedCategorias.filter((item) => item !== 'Todos'))

  const refresh = useCallback(() => setRefreshKey((value) => value + 1), [])

  useEffect(() => {
    let active = true

    async function cargarDatos() {
      setLoading(true)
      setError(null)

      try {
        const [items, cats] = await Promise.all([
          getEmprendimientos({ includePending }),
          getCategorias(),
        ])

        if (!active) return
        setEmprendimientos(items)
        setCategorias(cats)
      } catch (err) {
        if (!active) return
        setError(err)
      } finally {
        if (active) setLoading(false)
      }
    }

    cargarDatos()

    return () => {
      active = false
    }
  }, [includePending, refreshKey])

  return {
    emprendimientos,
    categorias,
    categoriasConTodos: ['Todos', ...categorias],
    loading,
    error,
    refresh,
  }
}
