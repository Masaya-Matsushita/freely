import { IconArrowBackUp, IconNotes } from '@tabler/icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { WiDayCloudy } from 'react-icons/wi'
import { getPath } from 'src/lib/const'

/**
 * @package
 */
export const NavLinks: FC<{ planId: string }> = (props) => {
  const { pathname } = useRouter()
  const [prefId, setPrefId] = useState('13')

  // LocalStorageにprefIdが無ければ13(東京)を初期値に設定
  useEffect(() => {
    const localPrefId = localStorage.getItem('prefId')
    if (localPrefId) {
      setPrefId(localPrefId)
    } else {
      localStorage.setItem('prefId', '13')
    }
  }, [])

  const LINKS = [
    {
      href: getPath('PLAN', props.planId),
      label: '計画表',
      icon: <IconNotes size={30} stroke={1.5} />,
      activePathList: ['/[planId]/plan', '/[planId]/edit', '/[planId]/spot'],
    },
    {
      href: getPath('WEATHER', prefId),
      label: '旅先の情報',
      icon: <WiDayCloudy size={30} />,
      activePathList: [
        '/weather/[prefId]',
        '/covid19/[prefId]',
        '/sake/[prefId]',
      ],
    },
    {
      href: getPath('INDEX'),
      label: 'トップへ戻る',
      icon: <IconArrowBackUp size={30} stroke={1.5} />,
      activePathList: ['/'],
    },
  ] as const

  return (
    <div className='mx-4 mt-10 space-y-5'>
      {LINKS.map((link) => {
        return (
          <Link href={link.href} key={link.href} passHref>
            <a
              className={`flex items-center rounded-sm no-underline hover:bg-main-300 ${
                link.activePathList.some((path) => path === pathname)
                  ? 'text-main-500'
                  : 'text-dark-500'
              }`}
            >
              <div
                className={`mr-4 h-10 w-1 shrink-0 rounded-sm ${
                  link.activePathList.some((path) => path === pathname)
                    ? 'bg-main-500'
                    : 'bg-white'
                }`}
              ></div>
              <div className='flex'>{link.icon}</div>
              <div className='ml-[10px] overflow-hidden text-clip xxs:whitespace-nowrap'>
                {link.label}
              </div>
            </a>
          </Link>
        )
      })}
    </div>
  )
}
