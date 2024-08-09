'use client'

import RemoteContentView from '@/components/RemoteContentView'
import styles from './page.module.scss'

import config from '@/../config'
import { Status } from '@/types/mastodon'
import fetcher from '@/utils/fetcher'
import useSWR from 'swr'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Link } from 'next-view-transitions'

export default function Page({ params: { id } }: { params: { id: string } }) {
  const {
    data: status,
    error,
    isLoading,
  } = useSWR<Status>(config.getStatusQuery(id), fetcher)

  const [currentAttachment, setCurrentAttachment] = useState(
    useSearchParams().get('attachment') || status?.media_attachments[0].id,
  )

  useEffect(() => {
    if (!currentAttachment) {
      setCurrentAttachment(status?.media_attachments[0].id)
    }
  })

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <Link href="/">{config.title}</Link>
        </h1>
      </header>
      <RemoteContentView error={error} isLoading={isLoading}>
        <main>
          {
            status?.media_attachments
              .filter(v => v.id === currentAttachment)
              .map(attachment => (
                <img
                  src={attachment.url}
                  className={styles.largePreview}
                  alt={attachment.description || ''}
                />
              ))[0]
          }
          <fieldset className={styles.attachmentRadio}>
            {status?.media_attachments.map(attachment => (
              <div
                className={
                  styles.attachmentRadioItem +
                  (currentAttachment === attachment.id
                    ? ' ' + styles.selected
                    : '')
                }
                key={attachment.id}
              >
                <input
                  type="radio"
                  id={attachment.id}
                  checked={currentAttachment === attachment.id}
                  onChange={ev => {
                    if (ev.target.checked) {
                      setCurrentAttachment(attachment.id)
                      if (window.history.pushState) {
                        let url = new URL(window.location.href)
                        url.searchParams.set('attachment', attachment.id)
                        window.history.pushState(
                          { path: url.href },
                          '',
                          url.href,
                        )
                      }
                    }
                  }}
                  className={styles.attachmentRadioInput}
                  style={
                    {
                      viewTransitionName:
                        'behind-attachment-id-' + attachment.id,
                      '--image-url': `url(${attachment.preview_url})`,
                    } as React.CSSProperties
                  }
                />
                <label
                  htmlFor={attachment.id}
                  className={styles.attachmentRadioLabel}
                >
                  <img
                    src={attachment.preview_url}
                    className={styles.attachmentRadioImage}
                    draggable={false}
                    alt={attachment.description || ''}
                    style={
                      {
                        viewTransitionName: 'attachment-id-' + attachment.id,
                      } as React.CSSProperties
                    }
                  />
                  <div className={styles.attachmentRadioImageOverlay}></div>
                </label>
              </div>
            ))}
          </fieldset>
        </main>
      </RemoteContentView>
    </>
  )
}
