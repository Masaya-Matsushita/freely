import {
  IconArrowBackUp,
  IconChartLine,
  IconLock,
  IconNotes,
} from '@tabler/icons'
import { useRouter } from 'next/router'
import { getPath } from 'src/lib/const'
import { ActiveLink } from 'src/lib/next'

/**
 * @package
 */
export const NavLinks = () => {
  const planId = useRouter().query.planId

  const LINKS = [
    {
      href: getPath('PLAN', String(planId)),
      label: '計画表',
      icon: <IconNotes size={28} stroke={1.7} />,
    },
    {
      href: getPath('PREF_NEWS', String(planId)),
      label: '旅先の情報',
      icon: <IconChartLine size={28} stroke={1.7} />,
    },
    {
      href: getPath('FORGOT_PASSWORD', String(planId)),
      label: 'パスワード再設定',
      icon: <IconLock size={28} stroke={1.7} />,
    },
    {
      href: getPath('INDEX'),
      label: 'トップへ戻る',
      icon: <IconArrowBackUp size={28} stroke={1.7} />,
    },
  ] as const

  return (
    <div className='mx-4 mt-10 space-y-4'>
      {LINKS.map(({ href, label, icon }) => {
        return (
          <ActiveLink href={href} passHref key={href}>
            {(isActive) => {
              return (
                <a
                  className={`flex items-center no-underline ${
                    isActive ? 'text-main-500' : 'text-dark-500'
                  }`}
                >
                  <div
                    className={`mr-4 h-10 w-1 rounded-sm ${
                      isActive ? 'bg-main-500' : 'bg-white'
                    }`}
                  ></div>
                  {icon}
                  <div className='ml-2'>{label}</div>
                </a>
              )
            }}
          </ActiveLink>
        )
      })}
    </div>
  )
}
