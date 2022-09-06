import { IconArrowBackUp, IconChartLine, IconNotes } from '@tabler/icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { getPath } from 'src/lib/const'

/**
 * @package
 */
export const NavLinks: FC<{ planId: string }> = (props) => {
  const { pathname } = useRouter()

  const LINKS = [
    {
      href: getPath('PLAN', props.planId),
      label: '計画表',
      icon: <IconNotes size={28} stroke={1.7} />,
      activePathList: ['/[planId]/plan', '/[planId]/edit', '/[planId]/spot'],
    },
    {
      href: getPath('WEATHER', props.planId),
      label: '旅先の情報',
      icon: <IconChartLine size={28} stroke={1.7} />,
      activePathList: ['/weather/[pref]', '/covid19/[pref]', '/sake/[pref]'],
    },
    {
      href: getPath('INDEX'),
      label: 'トップへ戻る',
      icon: <IconArrowBackUp size={28} stroke={1.7} />,
      activePathList: ['/'],
    },
  ] as const

  return (
    <div className='mx-4 mt-10 space-y-4'>
      {LINKS.map((link) => {
        return (
          <Link href={link.href} key={link.href}>
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
              <div className='ml-2 overflow-hidden text-clip xxs:whitespace-nowrap'>
                {link.label}
              </div>
            </a>
          </Link>
        )
      })}
    </div>
  )
}
