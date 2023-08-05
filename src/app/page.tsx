'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.scss'
import config from '../../config'
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
      const response = await fetch(config.query)
      setPosts(await response.json())
    })()
  }, [])

  return (
    <div className={notoSerif.className}>
      <header className={styles.header}>
        <h1 className={styles.title}>{config.title}</h1>
        <p className={styles.subtitle}>{config.subtitle}</p>
      </header>
      <main className={styles.main}>
        {posts.flatMap(post =>
          post.media_attachments.map(attachment => (
            <div className={styles.attachment} key={attachment.id}>
              <Blurhash
                hash={attachment.blurhash}
                className={styles.blurhashBehind}
                width="100%"
                height="auto"
              />
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
      <footer className={styles.footer}>{config.footer}</footer>
    </div>
  )
}
