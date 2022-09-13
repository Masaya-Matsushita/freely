import Link from 'next/link'
import { getPath } from 'src/lib/const'
import { HeaderWrapper } from 'src/pages-layout/HeaderWrapper'

const LINKS = [
  {
    path: 'INDEX',
    text: 'ホーム',
  },
  {
    path: 'CREATE',
    text: '作成する',
  },
  {
    path: 'HISTORY',
    text: '履歴',
  },
] as const

/**
 * @package
 */
export const Header = () => {
  return (
    <HeaderWrapper>
      <div className='ml-8 text-2xl font-medium tracking-wider text-dark-500 xs:ml-8 xs:text-3xl xs:font-normal'>
        Freely
      </div>
      <div className='mr-3 flex items-center xs:mr-10'>
        {LINKS.map((link) => {
          return (
            <Link href={getPath(link.path)} key={link.path}>
              <a className='mx-3 py-2 text-sm font-bold text-main-500 xs:mx-5 sm:text-base'>
                {link.text}
              </a>
            </Link>
          )
        })}
      </div>
    </HeaderWrapper>
  )
}
