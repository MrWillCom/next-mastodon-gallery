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
import useSWRInfinite from 'swr/infinite'

import Spinner from '@/components/Spinner'
import fetcher from '@/utils/fetcher'

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

  const { data, error, isLoading, size, setSize } = useSWRInfinite<Post[]>(
    (pageIndex, previousPageData) => {
      const query = new URL(config.query)
      query.searchParams.set('limit', config.limit.toString())

      if (previousPageData && previousPageData.length === 0) {
        return null
      }

      if (pageIndex === 0 || previousPageData === null) {
        return query.href
      }

      query.searchParams.set(
        'max_id',
        previousPageData[previousPageData.length - 1].id,
      )
      return query.href
    },
    fetcher,
  )

  const posts = data ? ([] as Post[]).concat(...data) : []
  const canLoadMore = !(
    data?.[0]?.length === 0 ||
    (data && data[data?.length - 1].length < config.limit)
  )

  const [supportsNativeShare, setSupportsNativeShare] = useState(false)

  useEffect(() => {
    setSupportsNativeShare(typeof navigator?.share === 'function')
  }, [])

  return (
    <div>
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
        <main>
          <div className={styles.grid}>
            {(() => {
              let i = -1
              return posts.flatMap((post, postIndex) => {
                if (postIndex % config.limit === 0) {
                  i = -1
                }
                return post.media_attachments.map(attachment => {
                  i++
                  return (
                    <Drawer.Root key={attachment.id}>
                      <Drawer.Trigger asChild>
                        <button
                          className={styles.attachment}
                          style={
                            { '--delay-coefficient': i } as React.CSSProperties
                          }
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
                        </button>
                      </Drawer.Trigger>
                      <Drawer.Portal>
                        <Drawer.Overlay className={styles.drawerOverlay} />
                        <Drawer.Content className={styles.drawerContent}>
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
                                  <div
                                    className={styles.drawerPostMetaItemIcon}
                                  >
                                    <HeartIcon />
                                  </div>
                                  <div
                                    className={styles.drawerPostMetaItemValue}
                                  >
                                    {post.favourites_count}
                                  </div>
                                </div>
                                <div className={styles.drawerPostMetaItem}>
                                  <div
                                    className={styles.drawerPostMetaItemIcon}
                                  >
                                    <ArrowUturnLeftIcon />
                                  </div>
                                  <div
                                    className={styles.drawerPostMetaItemValue}
                                  >
                                    {post.reblogs_count}
                                  </div>
                                </div>
                                <div className={styles.drawerPostMetaItem}>
                                  <div
                                    className={styles.drawerPostMetaItemIcon}
                                  >
                                    <ChatBubbleLeftIcon />
                                  </div>
                                  <div
                                    className={styles.drawerPostMetaItemValue}
                                  >
                                    {post.replies_count}
                                  </div>
                                </div>
                                <a
                                  href={post.url}
                                  target="_blank"
                                  className={styles.drawerPostMetaItem}
                                >
                                  <div
                                    className={styles.drawerPostMetaItemIcon}
                                  >
                                    <ArrowTopRightOnSquareIcon />
                                  </div>
                                  <div
                                    className={styles.drawerPostMetaItemValue}
                                  >
                                    Source
                                  </div>
                                </a>
                                {supportsNativeShare ? (
                                  <button
                                    className={styles.drawerPostMetaItem}
                                    onClick={() => {
                                      navigator
                                        .share({ url: post.url })
                                        .catch(() => {})
                                    }}
                                  >
                                    <div
                                      className={styles.drawerPostMetaItemIcon}
                                    >
                                      <ArrowUpOnSquareIcon />
                                    </div>
                                    <div
                                      className={styles.drawerPostMetaItemValue}
                                    >
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
                  )
                })
              })
            })()}
          </div>
          {canLoadMore ? (
            <button
              onClick={() => {
                setSize(size + 1)
              }}
              className={styles.loadMore}
            >
              Load More
            </button>
          ) : (
            <p className={styles.theEnd}>The End.</p>
          )}
        </main>
      )}
      <footer className={styles.footer}>{config.footer}</footer>
    </div>
  )
}
