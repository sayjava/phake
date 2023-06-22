import { useRouter } from 'next/router'
import { useConfig } from 'nextra-theme-docs'
export default {
  logo: <span>Phake</span>,
  project: {
    link: 'https://github.com/sayjava/phake'
  },
  docsRepositoryBase: 'https://github.com/sayjava/phake/blob/main/packages/web',
  useNextSeoProps () {
    return {
      titleTemplate: '%s – Phake'
    }
  },
  head: () => {
    const { route, locales, locale } = useRouter()
    const { frontMatter, title } = useConfig()

    return (
      <>
        <meta name='msapplication-TileColor' content='#ffffff' />
        <meta name='apple-mobile-web-app-title' content='Phake' />
        <meta name='description' content={frontMatter.description || ''} />
      </>
    )
  },
  footer: {
    text: (
      <span>
        MIT {new Date().getFullYear()} ©{' '}
        <a href='https://github.com/sayjava/phake' target='_blank' rel='noreferrer'>
          Phake
        </a>
        .
      </span>
    )
  }
}
