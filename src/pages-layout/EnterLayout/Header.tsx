import Link from 'next/link'
import { getPath } from 'src/lib/const'

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
    <header className='flex h-24 items-center justify-between border-b border-solid border-white border-b-slate-300 pt-6'>
      <div className='ml-8 text-3xl font-medium tracking-wider text-dark-500'>
        Freely
      </div>
      <div className='mr-3 flex items-center'>
        {LINKS.map((link) => {
          return (
            <Link href={getPath(link.path)} key={link.path}>
              <a className='mx-3 py-2 text-sm font-bold text-main-500'>
                {link.text}
              </a>
            </Link>
          )
        })}
      </div>
    </header>
  )
}
