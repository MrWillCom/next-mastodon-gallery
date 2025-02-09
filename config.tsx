import type { JSX } from 'react'

const config: {
  metadata: {
    title: string
    description: string
  }
  query: string
  limit: number
  title: string | JSX.Element
  subtitle: string | JSX.Element
  errorMessage: string | JSX.Element
  source: string | JSX.Element
  share: string | JSX.Element
  loadMore: string | JSX.Element
  theEnd: string | JSX.Element
  footer: string | JSX.Element
} = {
  metadata: {
    title: 'Gallery - Mr. Will',
    description: 'Gallery of my photographs posted on Mastodon.',
  },
  query:
    'https://noc.social/api/v1/accounts/72358/statuses?only_media=true&tagged=photography', // check README.md#about-mastodon-api-query-url
  limit: 20,
  title: 'Gallery',
  subtitle: 'A fine way to showcase sparkles in life.',
  errorMessage: 'Failed to fetch from API.',
  source: 'Source',
  share: 'Share',
  loadMore: 'Load More',
  theEnd: 'Q.E.D.',
  footer: (
    <>
      <p>
        <a href="https://mrwillcom.com/">Home</a> ·{' '}
        <a href="https://blog.mrwillcom.com/" target="_blank">
          Blog
        </a>{' '}
        ·{' '}
        <a
          href="https://github.com/MrWillCom/next-mastodon-gallery"
          target="_blank"
        >
          GitHub
        </a>{' '}
        ·{' '}
        <a rel="me" href="https://noc.social/@MrWillCom" target="_blank">
          Mastodon
        </a>
      </p>
      <p>Copyright © 2022-2024 Mr. Will.</p>
      <p>
        This website is licensed under{' '}
        <a
          href="https://github.com/MrWillCom/next-mastodon-gallery/blob/main/LICENSE"
          target="_blank"
        >
          MIT License
        </a>
        .
      </p>
      <p>
        Photos without notes on licenses are licensed under{' '}
        <a
          href="https://creativecommons.org/licenses/by-nc/4.0"
          target="_blank"
        >
          CC BY-NC 4.0
        </a>
        , otherwise they follow the stated license. Those available on{' '}
        <a href="https://unsplash.com/@mrwillcom" target="_blank">
          Unsplash
        </a>{' '}
        are free to use under the{' '}
        <a href="https://unsplash.com/license" target="_blank">
          Unsplash License
        </a>
        .
      </p>
    </>
  ),
}

export default config
