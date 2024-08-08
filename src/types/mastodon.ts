interface Status {
  id: string
  created_at: string
  url: string
  replies_count: number
  reblogs_count: number
  favourites_count: number
  content: string
  media_attachments: MediaAttachment[]
}

interface MediaAttachment {
  id: string
  type: 'unknown' | 'image' | 'gifv' | 'video' | 'audio'
  url: string
  preview_url: string
  description: string | null
  blurhash: string
}

export type { Status }
