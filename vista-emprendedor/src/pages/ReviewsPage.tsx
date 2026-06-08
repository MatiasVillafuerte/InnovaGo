import { useState } from 'react'
import { Star, Flag, MessageCircle, ThumbsUp } from 'lucide-react'
import { Card, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Textarea } from '../components/ui/Textarea'
import { reviews as initialReviews, dashboardStats } from '../data/mockData'
import { formatDate } from '../lib/utils'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'}`}
        />
      ))}
    </div>
  )
}

export function ReviewsPage() {
  const [reviewList, setReviewList] = useState(initialReviews)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')

  const handleReply = (id: string) => {
    setReviewList((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, replied: true, reply: replyText } : r
      )
    )
    setReplyingTo(null)
    setReplyText('')
  }

  const handleReport = (id: string) => {
    setReviewList((prev) => prev.filter((r) => r.id !== id))
  }

  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviewList.filter((r) => r.rating === stars).length,
    percentage: (reviewList.filter((r) => r.rating === stars).length / reviewList.length) * 100,
  }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Reseñas y Calificaciones</h1>
        <p className="text-slate-500 dark:text-slate-400">Gestiona los comentarios de tus clientes</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="text-center">
          <p className="text-5xl font-bold text-slate-900 dark:text-slate-100">
            {dashboardStats.averageRating.toFixed(1)}
          </p>
          <StarRating rating={Math.round(dashboardStats.averageRating)} />
          <p className="mt-2 text-sm text-slate-500">{reviewList.length} reseñas totales</p>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Distribución de calificaciones</CardTitle>
          </CardHeader>
          <div className="space-y-2">
            {ratingDistribution.map(({ stars, count, percentage }) => (
              <div key={stars} className="flex items-center gap-3">
                <span className="w-8 text-sm text-slate-600 dark:text-slate-400">{stars}★</span>
                <div className="flex-1 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full bg-amber-400"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-8 text-sm text-slate-500">{count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        {reviewList.map((review) => (
          <Card key={review.id}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-medium dark:bg-slate-800">
                  {review.author.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-900 dark:text-slate-100">{review.author}</span>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="text-xs text-slate-500">{formatDate(review.date)}</p>
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{review.comment}</p>

                  {review.replied && review.reply && (
                    <div className="mt-3 rounded-lg border-l-2 border-primary-500 bg-primary-50 p-3 dark:bg-primary-900/20">
                      <p className="text-xs font-medium text-primary-700 dark:text-primary-400">Tu respuesta:</p>
                      <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{review.reply}</p>
                    </div>
                  )}

                  {replyingTo === review.id && (
                    <div className="mt-3">
                      <Textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Escribe tu respuesta..."
                        rows={2}
                      />
                      <div className="mt-2 flex gap-2">
                        <Button size="sm" onClick={() => handleReply(review.id)}>
                          Enviar
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setReplyingTo(null)}>
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex shrink-0 gap-2">
                {!review.replied && replyingTo !== review.id && (
                  <Button variant="outline" size="sm" onClick={() => setReplyingTo(review.id)}>
                    <MessageCircle className="h-4 w-4" />
                    Responder
                  </Button>
                )}
                {review.rating <= 2 && (
                  <Button variant="ghost" size="sm" onClick={() => handleReport(review.id)}>
                    <Flag className="h-4 w-4 text-red-500" />
                    Reportar
                  </Button>
                )}
                {review.replied && (
                  <Badge variant="success" icon={ThumbsUp}>
                    Respondida
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
