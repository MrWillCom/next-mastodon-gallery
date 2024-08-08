import styles from './page.module.scss'

import config from '@/../config'
import { Status } from '@/types/mastodon'

async function getStatus(id: string) {
  const response = await fetch(config.getStatusQuery(id))

  if (!response.ok) {
    throw new Error('Failed to fetch from API')
  }

  return (await response.json()) as Status
}

export default async function Page({
  params: { id, attachmentId },
}: {
  params: { id: string; attachmentId: string }
}) {
  const status = await getStatus(id)

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>{config.title}</h1>
      </header>
      <main>
        {
          status.media_attachments
            .filter(attachment => attachment.id === attachmentId)
            .map(attachment => (
              <div className={styles.attachment}>
                <img
                  src={attachment.url}
                  className={styles.image}
                  alt={attachment.description || ''}
                  style={
                    {
                      viewTransitionName: 'attachment-id-' + attachment.id,
                    } as React.CSSProperties
                  }
                />
              </div>
            ))[0]
        }
      </main>
    </>
  )
}
