'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.css'
import Image from 'next/image'

export default function Home() {
  const [posts, setPosts]: [
    Array<{ media_attachments: Array<{ url: string; id: string }> }>,
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
    <>
      {posts.flatMap(post =>
        post.media_attachments.map(attachment => (
          <Image
            src={attachment.url}
            style={{ objectFit: 'cover' }}
            width={200}
            height={200}
            alt="not set yet"
            key={attachment.id}
          />
        )),
      )}
    </>
  )
}
