'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.scss'
import config from '@/../config'
import { Blurhash } from 'react-blurhash'
import useSWRInfinite from 'swr/infinite'
import { Link } from 'next-view-transitions'

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
                    <Link
                      className={styles.attachment}
                      style={
                        { '--delay-coefficient': i } as React.CSSProperties
                      }
                      key={attachment.id}
                      href={'/status/' + status.id + '/' + attachment.id}
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
                        style={
                          {
                            viewTransitionName:
                              'attachment-id-' + attachment.id,
                          } as React.CSSProperties
                        }
                      />
                    </Link>
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
