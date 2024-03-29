'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.scss'
import config from '../../config'
import { Blurhash } from 'react-blurhash'
import { Drawer } from 'vaul'
import {
  HeartIcon,
  ArrowUturnLeftIcon,
  ChatBubbleLeftIcon,
  ArrowTopRightOnSquareIcon,
  ArrowUpOnSquareIcon,
} from '@heroicons/react/24/outline'
import useSWR from 'swr'

import { Noto_Serif } from 'next/font/google'
import Spinner from '@/components/Spinner'

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

  const {
    data: posts,
    error,
    isLoading,
  }: { data: Post[]; error: Error | undefined; isLoading: boolean } = useSWR(
    config.query,
    (...args) => fetch(...args).then(res => res.json()),
  )
  const [supportsNativeShare, setSupportsNativeShare] = useState(false)

  useEffect(() => {
    setSupportsNativeShare(typeof navigator?.share === 'function')
  }, [])

  return (
    <div className={notoSerif.className}>
      <header className={styles.header}>
        <h1 className={styles.title}>{config.title}</h1>
        <p className={styles.subtitle}>{config.subtitle}</p>
      </header>
      {error ? (
        <main className={styles.mainPlaceholder}>Failed to fetch from API</main>
      ) : isLoading ? (
        <main className={styles.mainPlaceholder}>
          <Spinner />
        </main>
      ) : (
        <main className={styles.main}>
          {posts.flatMap(post =>
            post.media_attachments.map(attachment => (
              <Drawer.Root key={attachment.id}>
                <Drawer.Trigger asChild>
                  <button className={styles.attachment}>
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
                  </button>
                </Drawer.Trigger>
                <Drawer.Portal>
                  <Drawer.Overlay className={styles.drawerOverlay} />
                  <Drawer.Content
                    className={styles.drawerContent + ' ' + notoSerif.className}
                  >
                    <div className={styles.drawerIndicator} />
                    <main className={styles.drawerMain}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={attachment.url}
                        className={styles.drawerImage}
                        alt={attachment.description || ''}
                      />
                      <div className={styles.drawerPostDetails}>
                        <div
                          className={styles.drawerPostContent}
                          dangerouslySetInnerHTML={{
                            __html: post.content ?? '',
                          }}
                        />
                        <div className={styles.drawerPostMeta}>
                          <div className={styles.drawerPostMetaItem}>
                            <div className={styles.drawerPostMetaItemIcon}>
                              <HeartIcon />
                            </div>
                            <div className={styles.drawerPostMetaItemValue}>
                              {post.favourites_count}
                            </div>
                          </div>
                          <div className={styles.drawerPostMetaItem}>
                            <div className={styles.drawerPostMetaItemIcon}>
                              <ArrowUturnLeftIcon />
                            </div>
                            <div className={styles.drawerPostMetaItemValue}>
                              {post.reblogs_count}
                            </div>
                          </div>
                          <div className={styles.drawerPostMetaItem}>
                            <div className={styles.drawerPostMetaItemIcon}>
                              <ChatBubbleLeftIcon />
                            </div>
                            <div className={styles.drawerPostMetaItemValue}>
                              {post.replies_count}
                            </div>
                          </div>
                          <a
                            href={post.url}
                            target="_blank"
                            className={styles.drawerPostMetaItem}
                          >
                            <div className={styles.drawerPostMetaItemIcon}>
                              <ArrowTopRightOnSquareIcon />
                            </div>
                            <div className={styles.drawerPostMetaItemValue}>
                              Source
                            </div>
                          </a>
                          {supportsNativeShare ? (
                            <button
                              className={
                                styles.drawerPostMetaItem +
                                ' ' +
                                notoSerif.className
                              }
                              onClick={() => {
                                navigator
                                  .share({ url: post.url })
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
              </Drawer.Root>
            )),
          )}
        </main>
      )}
      <footer className={styles.footer}>{config.footer}</footer>
    </div>
  )
}
