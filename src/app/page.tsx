'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.css'

export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    ;(async () => {
      const response = await fetch(
        'https://noc.social/api/v1/accounts/72358/statuses?only_media=true&tagged=photography',
      )
      setPosts(await response.json())
    })()
  }, [])

  return (
    <>
      {posts.flatMap(post =>
        post.media_attachments.map(attachment => (
          <img
            src={attachment.url}
            style={{ width: 200, height: 200, objectFit: 'cover' }}
            key={attachment.id}
          />
        )),
      )}
    </>
  )
}
