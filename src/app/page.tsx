'use client'

import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import styles from './page.module.scss'
import config from '../../config'
import { Blurhash } from 'react-blurhash'
import Image from 'next/image'
import { Drawer } from 'vaul'
import {
  HeartIcon,
  ArrowUturnLeftIcon,
  ChatBubbleLeftIcon,
  ArrowTopRightOnSquareIcon,
  ArrowUpOnSquareIcon,
} from '@heroicons/react/24/outline'

import { Noto_Serif } from 'next/font/google'

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
})

export default function Home() {
  type Post = {
    id: string
    created_at: string
    url: string
    replies_count: number
    reblogs_count: number
    favourites_count: number
    content: string
    media_attachments: MediaAttachment[]
  }

  type MediaAttachment = {
    id: string
    type: 'unknown' | 'image' | 'gifv' | 'video' | 'audio'
    url: string
    preview_url: string
    description: string | null
    blurhash: string
  }

  const [posts, setPosts] = useState<Post[]>([])
  const [currentPost, setCurrentPost] = useState<Post | null>()
  const [currentAttachment, setCurrentAttachment] =
    useState<MediaAttachment | null>(null)

  useEffect(() => {
    ;(async () => {
      const response = await fetch(config.query)
      setPosts(await response.json())
    })()
  }, [])

  return (
    <Drawer.Root>
      <div className={notoSerif.className}>
        <header className={styles.header}>
          <h1 className={styles.title}>{config.title}</h1>
          <p className={styles.subtitle}>{config.subtitle}</p>
        </header>
        <main className={styles.main}>
          {posts.flatMap(post =>
            post.media_attachments.map(attachment => (
              <Drawer.Trigger key={attachment.id} asChild>
                <div
                  className={styles.attachment}
                  onClick={() => {
                    setCurrentPost(post)
                    setCurrentAttachment(attachment)
                  }}
                >
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={attachment.preview_url}
                    className={styles.image}
                    alt={attachment.description || ''}
                  />
                </div>
              </Drawer.Trigger>
            )),
          )}
        </main>
        <footer className={styles.footer}>{config.footer}</footer>
        <Drawer.Portal>
          <Drawer.Overlay className={styles.drawerOverlay} />
          <Drawer.Content
            className={styles.drawerContent + ' ' + notoSerif.className}
          >
            <div className={styles.drawerIndicator} />
            <main className={styles.drawerMain}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentAttachment?.url}
                className={styles.drawerImage}
                alt={currentAttachment?.description || ''}
              />
              <div className={styles.drawerPostDetails}>
                <div
                  className={styles.drawerPostContent}
                  dangerouslySetInnerHTML={{
                    __html: currentPost?.content ?? '',
                  }}
                />
                <div className={styles.drawerPostMeta}>
                  <div className={styles.drawerPostMetaItem}>
                    <div className={styles.drawerPostMetaItemIcon}>
                      <HeartIcon />
                    </div>
                    <div className={styles.drawerPostMetaItemValue}>
                      {currentPost?.favourites_count}
                    </div>
                  </div>
                  <div className={styles.drawerPostMetaItem}>
                    <div className={styles.drawerPostMetaItemIcon}>
                      <ArrowUturnLeftIcon />
                    </div>
                    <div className={styles.drawerPostMetaItemValue}>
                      {currentPost?.reblogs_count}
                    </div>
                  </div>
                  <div className={styles.drawerPostMetaItem}>
                    <div className={styles.drawerPostMetaItemIcon}>
                      <ChatBubbleLeftIcon />
                    </div>
                    <div className={styles.drawerPostMetaItemValue}>
                      {currentPost?.replies_count}
                    </div>
                  </div>
                  <a
                    href={currentPost?.url}
                    target="_blank"
                    className={styles.drawerPostMetaItem}
                  >
                    <div className={styles.drawerPostMetaItemIcon}>
                      <ArrowTopRightOnSquareIcon />
                    </div>
                    <div className={styles.drawerPostMetaItemValue}>Source</div>
                  </a>
                  {typeof navigator.share === 'function' ? (
                    <button
                      className={
                        styles.drawerPostMetaItem + ' ' + notoSerif.className
                      }
                      onClick={() => {
                        navigator
                          .share({ url: currentPost?.url })
                          .catch(() => {})
                      }}
                    >
                      <div className={styles.drawerPostMetaItemIcon}>
                        <ArrowUpOnSquareIcon />
                      </div>
                      <div className={styles.drawerPostMetaItemValue}>
                        Share
                      </div>
                    </button>
                  ) : null}
                </div>
              </div>
            </main>
          </Drawer.Content>
        </Drawer.Portal>
      </div>
    </Drawer.Root>
  )
}
