'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.scss'

export default function Home() {
  const [posts, setPosts]: [
    Array<{
      id: string
      created_at: string
      content: string
      media_attachments: Array<{
        id: string
        url: string
        description: string
      }>
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
      {posts.map(post => (
        <div className={styles.post} key={post.id}>
          <div className={styles.header}>
            <h1>{post.created_at}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
          </div>
          <div className={styles.attachments}>
            {post.media_attachments.map(attachment => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={attachment.url}
                className={styles.image}
                alt={attachment['description']}
                key={attachment.id}
              />
            ))}
          </div>
        </div>
      ))}
    </main>
  )
}
