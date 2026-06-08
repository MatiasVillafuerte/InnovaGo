import { useState } from 'react'
import { Mail, Send, Clock, CheckCircle, XCircle } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Textarea } from '../components/ui/Textarea'
import { messages as initialMessages } from '../data/mockData'
import { cn, formatDate } from '../lib/utils'
import type { Message } from '../types'

const statusConfig = {
  pending: { label: 'Pendiente', variant: 'warning' as const, icon: Clock },
  answered: { label: 'Respondida', variant: 'success' as const, icon: CheckCircle },
  closed: { label: 'Cerrada', variant: 'default' as const, icon: XCircle },
}

export function MessagesPage() {
  const [messageList] = useState(initialMessages)
  const [selected, setSelected] = useState<Message | null>(messageList[0])
  const [reply, setReply] = useState('')
  const [filter, setFilter] = useState<'all' | Message['status']>('all')

  const filtered = filter === 'all' ? messageList : messageList.filter((m) => m.status === filter)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Mensajes y Solicitudes</h1>
        <p className="text-slate-500 dark:text-slate-400">Bandeja de entrada y historial de conversaciones</p>
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
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400'
            )}
          >
            {f === 'all' ? 'Todos' : statusConfig[f].label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <Card padding={false} className="lg:col-span-2 overflow-hidden">
          <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">Bandeja de entrada</h3>
          </div>
          <div className="max-h-[500px] overflow-y-auto">
            {filtered.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => setSelected(msg)}
                  className={cn(
                    'flex w-full gap-3 border-b border-slate-100 p-4 text-left transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50',
                    selected?.id === msg.id && 'bg-primary-50 dark:bg-primary-900/20'
                  )}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                    {msg.sender.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className={cn('truncate text-sm font-medium', msg.unread && 'text-slate-900 dark:text-white')}>
                        {msg.sender}
                      </span>
                      {msg.unread && <span className="h-2 w-2 shrink-0 rounded-full bg-primary-600" />}
                    </div>
                    <p className="truncate text-xs font-medium text-slate-700 dark:text-slate-300">{msg.subject}</p>
                    <p className="truncate text-xs text-slate-500">{msg.preview}</p>
                  </div>
                </button>
              ))}
          </div>
        </Card>

        <Card className="lg:col-span-3">
          {selected ? (
            <div className="flex h-full flex-col">
              <div className="border-b border-slate-200 pb-4 dark:border-slate-700">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{selected.subject}</h3>
                    <p className="text-sm text-slate-500">
                      De: {selected.sender} · {formatDate(selected.date)}
                    </p>
                  </div>
                  <Badge variant={statusConfig[selected.status].variant}>
                    {statusConfig[selected.status].label}
                  </Badge>
                </div>
              </div>

              <div className="flex-1 py-4">
                <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800/50">
                  <p className="text-sm text-slate-700 dark:text-slate-300">{selected.preview}</p>
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Me gustaría obtener más información
                    sobre sus productos y condiciones de envío. ¿Podrían indicarme los tiempos de entrega?
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4 dark:border-slate-700">
                <Textarea
                  label="Responder consulta"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Escribe tu respuesta..."
                  rows={3}
                />
                <div className="mt-3 flex justify-end gap-2">
                  <Button variant="outline">Marcar como cerrada</Button>
                  <Button>
                    <Send className="h-4 w-4" />
                    Enviar respuesta
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-slate-400">
              <Mail className="mr-2 h-8 w-8" />
              Selecciona un mensaje
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
