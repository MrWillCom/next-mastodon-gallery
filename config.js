const config = {
  query:
    'https://noc.social/api/v1/accounts/72358/statuses?only_media=true&tagged=photography',
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
      <a href="https://noc.social/@MrWillCom" target="_blank">
        Mastodon
      </a>
    </>
  ),
}

module.exports = config
