'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.scss'
import { Blurhash } from 'react-blurhash'
import Image from 'next/image'

import { Noto_Serif } from 'next/font/google'

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
})

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
        blurhash: string
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
    <div className={notoSerif.className}>
      <header className={styles.header}>
        <h1 className={styles.title}>Gallery</h1>
        <p className={styles.subtitle}>by Mr. Will</p>
      </header>
      <main className={styles.main}>
        {posts.flatMap(post =>
          post.media_attachments.map(attachment => (
            <div className={styles.attachment} key={attachment.id}>
              <Blurhash
                hash={attachment.blurhash}
                className={styles.blurhash}
                width="100%"
                height="auto"
              />
              <Image
                src={attachment.url}
                width={200}
                height={1080}
                className={styles.image}
                alt={attachment['description']}
              />
            </div>
          )),
        )}
      </main>
    </div>
  )
}
