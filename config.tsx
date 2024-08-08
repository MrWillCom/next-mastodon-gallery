const config: {
  metadata: {
    title: string
    description: string
  }
  query: string
  limit: number
  getStatusQuery: (id: string) => string
  title: string | JSX.Element
  subtitle: string | JSX.Element
  footer: string | JSX.Element
} = {
  metadata: {
    title: 'Gallery - Mr. Will',
    description: 'Gallery of my photographs posted on Mastodon.',
  },
  query:
    'https://noc.social/api/v1/accounts/72358/statuses?only_media=true&tagged=photography', // check README.md#about-mastodon-api-query-url
  limit: 20,
  getStatusQuery: id => 'https://noc.social/api/v1/statuses/' + id,
  title: 'Gallery',
  subtitle: 'by Mr. Will',
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
        . Photos are licensed under{' '}
        <a
          href="https://creativecommons.org/licenses/by-nc/4.0"
          target="_blank"
        >
          CC BY-NC 4.0
        </a>
        , unless otherwise noted.
      </p>
    </>
  ),
}

export default config
