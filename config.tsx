const config: {
  metadata: {
    title: string
    description: string
  }
  query: string
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
  title: 'Gallery',
  subtitle: 'by Mr. Will',
  footer: (
    <>
      <a href="https://creativecommons.org/licenses/by-nc/4.0" target="_blank">
        CC BY-NC 4.0
      </a>{' '}
      © 2023 Mr. Will. · <a href="https://mrwillcom.com/">Home</a> ·{' '}
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
    </>
  ),
}

export default config
