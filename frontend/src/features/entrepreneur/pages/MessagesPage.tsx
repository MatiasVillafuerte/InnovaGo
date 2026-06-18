import { useState } from 'react'
import { Mail, Send, Clock, CheckCircle, XCircle, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card'
import { Button } from '../../../components/ui/Button'
import { Badge } from '../../../components/ui/Badge'
import { Textarea } from '../../../components/ui/Input'
import { messages as initialMessages } from '../data/mockData'
import { cn, formatDate } from '../lib/utils'
import type { Message } from '../types'
import { ConfirmModal } from '../../../components/ui/ConfirmModal'
import { Toast } from '../../../components/ui/Toast'

const statusConfig = {
  pending: { label: 'Pendiente', variant: 'warning' as const, icon: Clock },
  answered: { label: 'Respondida', variant: 'success' as const, icon: CheckCircle },
  closed: { label: 'Cerrada', variant: 'default' as const, icon: XCircle },
}

export function MessagesPage() {
  const [messageList, setMessageList] = useState(initialMessages)
  const [selected, setSelected] = useState<Message | null>(messageList[0] || null)
  const [reply, setReply] = useState('')
  const [filter, setFilter] = useState<'all' | Message['status']>('all')

  // Estados de confirmación y Toast
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [targetId, setTargetId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' | 'warning' }>({
    show: false,
    message: '',
    type: 'success',
  })

  const filtered = filter === 'all' ? messageList : messageList.filter((m) => m.status === filter)

  const handleSendReply = () => {
    if (!reply.trim()) {
      setToast({ show: true, message: 'Revise los datos ingresados.', type: 'warning' })
      return
    }
    
    if (selected) {
      setMessageList((prev) =>
        prev.map((m) => (m.id === selected.id ? { ...m, status: 'answered', unread: false } : m))
      )
      setSelected((prev) => prev ? { ...prev, status: 'answered', unread: false } : null)
      setReply('')
      setToast({ show: true, message: 'Respuesta enviada correctamente.', type: 'success' })
    }
  }

  const handleCloseMessage = () => {
    if (selected) {
      setMessageList((prev) =>
        prev.map((m) => (m.id === selected.id ? { ...m, status: 'closed', unread: false } : m))
      )
      setSelected((prev) => prev ? { ...prev, status: 'closed', unread: false } : null)
      setToast({ show: true, message: 'Mensaje marcado como cerrado.', type: 'success' })
    }
  }

  const requestDelete = (id: string) => {
    setTargetId(id)
    setConfirmOpen(true)
  }

  const handleConfirmDelete = () => {
    if (targetId) {
      const remaining = messageList.filter((m) => m.id !== targetId)
      setMessageList(remaining)
      setToast({ show: true, message: 'Mensaje eliminado correctamente.', type: 'success' })
      
      // Si el seleccionado fue eliminado, elegimos el primero de los restantes
      if (selected?.id === targetId) {
        setSelected(remaining[0] || null)
      }
      setTargetId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Mensajes y Solicitudes</h1>
        <p className="text-slate-550">Bandeja de entrada y historial de conversaciones</p>
      </div>

      <div className="flex gap-2 overflow-x-auto">
        {(['all', 'pending', 'answered', 'closed'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
              filter === f
                ? 'bg-primary-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            )}
          >
            {f === 'all' ? 'Todos' : statusConfig[f].label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <Card padding={false} className="lg:col-span-2 overflow-hidden">
          <div className="border-b border-slate-200 px-4 py-3">
            <h3 className="font-semibold text-slate-900">Bandeja de entrada</h3>
          </div>
          <div className="max-h-[500px] overflow-y-auto">
            {filtered.map((msg) => (
              <button
                key={msg.id}
                onClick={() => setSelected(msg)}
                className={cn(
                  'flex w-full gap-3 border-b border-slate-100 p-4 text-left transition-colors hover:bg-slate-50',
                  selected?.id === msg.id && 'bg-primary-50'
                )}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-medium text-primary-700">
                  {msg.sender.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className={cn('truncate text-sm font-medium', msg.unread && 'text-slate-900')}>
                      {msg.sender}
                    </span>
                    {msg.unread && <span className="h-2 w-2 shrink-0 rounded-full bg-primary-600" />}
                  </div>
                  <p className="truncate text-xs font-medium text-slate-755">{msg.subject}</p>
                  <p className="truncate text-xs text-slate-500">{msg.preview}</p>
                </div>
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="p-8 text-center text-slate-400 text-sm">
                No hay mensajes en esta bandeja.
              </div>
            )}
          </div>
        </Card>

        <Card padding={true} className="lg:col-span-3">
          {selected ? (
            <div className="flex h-full flex-col">
              <div className="border-b border-slate-200 pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{selected.subject}</h3>
                    <p className="text-sm text-slate-500 mt-0.5">
                      De: {selected.sender} · {formatDate(selected.date)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={statusConfig[selected.status].variant}>
                      {statusConfig[selected.status].label}
                    </Badge>
                    <button
                      onClick={() => requestDelete(selected.id)}
                      title="Eliminar mensaje"
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-650 transition-colors"
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex-1 py-4">
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-sm text-slate-700">{selected.preview}</p>
                  <p className="mt-2 text-sm text-slate-755">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Me gustaría obtener más información
                    sobre sus productos y condiciones de envío. ¿Podrían indicarme los tiempos de entrega?
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <Textarea
                  label="Responder consulta"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Escribe tu respuesta..."
                  rows={3}
                />
                <div className="mt-3 flex justify-between gap-2">
                  <Button variant="danger" size="sm" onClick={() => requestDelete(selected.id)}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Eliminar
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleCloseMessage}>
                      Marcar como cerrada
                    </Button>
                    <Button size="sm" onClick={handleSendReply}>
                      <Send className="h-4 w-4 mr-1" />
                      Enviar respuesta
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-64 flex-col items-center justify-center text-slate-400">
              <Mail className="mb-2 h-10 w-10 text-slate-300" />
              Selecciona un mensaje
            </div>
          )}
        </Card>
      </div>

      {/* Modal de Confirmación */}
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="¿Eliminar mensaje?"
        message="¿Está seguro de que desea eliminar este mensaje de la bandeja?"
        confirmText="Eliminar"
        variant="danger"
      />

      {/* Alerta Toast */}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />
    </div>
  )
}
