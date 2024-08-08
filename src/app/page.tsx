'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.scss'
import config from '@/../config'
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
import { Status } from '@/types/mastodon'

export default function Home() {
  const { data, error, isLoading, size, setSize } = useSWRInfinite<Status[]>(
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

  const statuses = data ? ([] as Status[]).concat(...data) : []
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
              return statuses.flatMap((status, statusIndex) => {
                if (statusIndex % config.limit === 0) {
                  i = -1
                }
                return status.media_attachments.map(attachment => {
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
                            <div className={styles.drawerStatusDetails}>
                              <div
                                className={styles.drawerStatusContent}
                                dangerouslySetInnerHTML={{
                                  __html: status.content ?? '',
                                }}
                              />
                              <div className={styles.drawerStatusMeta}>
                                <div className={styles.drawerStatusMetaItem}>
                                  <div
                                    className={styles.drawerStatusMetaItemIcon}
                                  >
                                    <HeartIcon />
                                  </div>
                                  <div
                                    className={styles.drawerStatusMetaItemValue}
                                  >
                                    {status.favourites_count}
                                  </div>
                                </div>
                                <div className={styles.drawerStatusMetaItem}>
                                  <div
                                    className={styles.drawerStatusMetaItemIcon}
                                  >
                                    <ArrowUturnLeftIcon />
                                  </div>
                                  <div
                                    className={styles.drawerStatusMetaItemValue}
                                  >
                                    {status.reblogs_count}
                                  </div>
                                </div>
                                <div className={styles.drawerStatusMetaItem}>
                                  <div
                                    className={styles.drawerStatusMetaItemIcon}
                                  >
                                    <ChatBubbleLeftIcon />
                                  </div>
                                  <div
                                    className={styles.drawerStatusMetaItemValue}
                                  >
                                    {status.replies_count}
                                  </div>
                                </div>
                                <a
                                  href={status.url}
                                  target="_blank"
                                  className={styles.drawerStatusMetaItem}
                                >
                                  <div
                                    className={styles.drawerStatusMetaItemIcon}
                                  >
                                    <ArrowTopRightOnSquareIcon />
                                  </div>
                                  <div
                                    className={styles.drawerStatusMetaItemValue}
                                  >
                                    Source
                                  </div>
                                </a>
                                {supportsNativeShare ? (
                                  <button
                                    className={styles.drawerStatusMetaItem}
                                    onClick={() => {
                                      navigator
                                        .share({ url: status.url })
                                        .catch(() => {})
                                    }}
                                  >
                                    <div
                                      className={
                                        styles.drawerStatusMetaItemIcon
                                      }
                                    >
                                      <ArrowUpOnSquareIcon />
                                    </div>
                                    <div
                                      className={
                                        styles.drawerStatusMetaItemValue
                                      }
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
