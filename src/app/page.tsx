'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.scss'
import moment from 'moment'
import { Blurhash } from "react-blurhash";

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

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
    <main className={styles.main + ' ' + inter.className}>
      {posts.map(post => (
        <div className={styles.post} key={post.id}>
          <div className={styles.header}>
            <h1 className={styles.date}>
              {moment(post.created_at).format('ll')}
            </h1>
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>
          </div>
          <div className={styles.attachments}>
            {post.media_attachments.map(attachment => (
              <div className={styles.attachment} key={attachment.id}>
                <Blurhash hash={attachment.blurhash} className={styles.blurhash} width="100%" height="auto" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={attachment.url}
                  className={styles.image}
                  alt={attachment['description']}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </main>
  )
}
