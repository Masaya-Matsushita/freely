import { Burger, CloseButton, Drawer } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
  IconArrowBackUp,
  IconChartLine,
  IconLock,
  IconNotes,
  IconShare,
} from '@tabler/icons'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { getPath } from 'src/lib/const'
import { ActiveLink } from 'src/lib/next'
import { ErrorBoundary } from 'src/pages-layout/ErrorBoundary'
import { HeaderWrapper } from 'src/pages-layout/HeaderWrapper'

/**
 * @package
 */
export const ContentLayout = (page: ReactElement) => {
  return (
    <ErrorBoundary>
      <Header />
      <main>{page}</main>
      <footer>Footer</footer>
    </ErrorBoundary>
  )
}

const Header = () => {
  const router = useRouter()
  const planId = router.query.planId
  const [opened, handlers] = useDisclosure(false)

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

  // パスの変更を検知して Drawer を閉じる処理
  useEffect(() => {
    router.events.on('routeChangeStart', handlers.close)
    return () => {
      router.events.off('routeChangeStart', handlers.close)
    }
  }, [handlers, router.events])

  return (
    <HeaderWrapper>
      <Drawer
        opened={opened}
        size={'65%'}
        onClose={() => handlers.close()}
        withCloseButton={false}
      >
        <CloseButton
          title='メニューを閉じる'
          size='xl'
          iconSize={32}
          onClick={() => handlers.close()}
          className='mt-11 ml-auto mr-4'
        />
        <div className='mt-14 mb-6 ml-10 text-3xl font-medium tracking-wider text-dark-500'>
          Freely
        </div>
        <hr className='mx-2 h-[1px] border-0 bg-dark-100' />
        <div className='mt-10 ml-4 space-y-4'>
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
      </Drawer>
      <div className='flex items-center gap-8'>
        <Burger
          opened={opened}
          onClick={() => handlers.open()}
          title='メニューを開く'
          color='#495057'
          className='ml-6'
        />
        <div className='text-2xl font-medium tracking-wider text-dark-500'>
          Freely
        </div>
      </div>
      <IconShare size={32} color='#6466F1' stroke={1.8} className='mr-6' />
    </HeaderWrapper>
  )
}
