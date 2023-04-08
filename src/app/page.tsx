'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.scss'

export default function Home() {
  const [posts, setPosts]: [
    Array<{
      media_attachments: Array<{ url: string; description: string; id: string }>
    }>,
    Function,
  ] = useState([])

  useEffect(() => {
    ;(async () => {
      const response = await fetch(
        'https://noc.social/api/v1/accounts/72358/statuses?only_media=true&tagged=photography',
      )
      setPosts(await response.json())
    })()
  }, [])

  return (
    <main className={styles.main}>
      {posts.flatMap(post =>
        post.media_attachments.map(attachment => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={attachment.url}
            className={styles.image}
            alt={attachment['description']}
            key={attachment.id}
          />
        )),
      )}
    </main>
  )
}
