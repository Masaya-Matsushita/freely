import { Burger, CloseButton, Drawer, UnstyledButton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconArrowLeft, IconArrowRight, IconShare } from '@tabler/icons'
import { NextRouter, useRouter } from 'next/router'
import { FC, ReactElement, useEffect } from 'react'
import { NavLinks } from './NavLinks'
import { ShareModal } from './ShareModal'
import { ErrorBoundary } from 'src/pages-layout/ErrorBoundary'
import { HeaderWrapper } from 'src/pages-layout/HeaderWrapper'

/**
 * @package
 */
export const ContentLayout = (page: ReactElement) => {
  const router = useRouter()
  const planId = router.query.planId

  return (
    <ErrorBoundary>
      {typeof planId === 'string' ? (
        <div>
          <Header router={router} planId={planId} />
          <div className='flex'>
            <SideNav planId={planId} />
            <main className='min-h-[calc(100vh-96px)] flex-1 bg-main-100'>
              {page}
            </main>
          </div>
          <footer>Footer</footer>
        </div>
      ) : null}
    </ErrorBoundary>
  )
}

type HeaderProps = {
  router: NextRouter
  planId: string
}

const Header: FC<HeaderProps> = (props) => {
  const [drawerOpened, drawerHandlers] = useDisclosure(false)
  const [modalOpened, modalHandlers] = useDisclosure(false)

  // パスの変更を検知して Drawer を閉じる処理
  useEffect(() => {
    props.router.events.on('routeChangeStart', drawerHandlers.close)
    return () => {
      props.router.events.off('routeChangeStart', drawerHandlers.close)
    }
  }, [drawerHandlers, props.router.events])

  return (
    <HeaderWrapper>
      <ShareModal
        planId={props.planId}
        opened={modalOpened}
        close={modalHandlers.close}
      />
      <Drawer
        opened={drawerOpened}
        size={'65%'}
        onClose={() => drawerHandlers.close()}
        withCloseButton={false}
      >
        <CloseButton
          title='メニューを閉じる'
          size='xl'
          iconSize={32}
          onClick={() => drawerHandlers.close()}
          className='mt-11 ml-auto mr-4'
        />
        <div className='mt-14 mb-6 ml-10 text-3xl font-medium tracking-wider text-dark-500'>
          Freely
        </div>
        <hr className='mx-2 h-[1px] border-0 bg-dark-100' />
        <NavLinks planId={props.planId} />
      </Drawer>
      <div className='flex items-center gap-8 xs:ml-4'>
        <Burger
          opened={drawerOpened}
          onClick={() => drawerHandlers.open()}
          title='メニューを開く'
          color='#495057'
          className='ml-6 sm:hidden'
        />
        <div className='text-2xl font-medium tracking-wider text-dark-500 xs:text-3xl xs:font-normal sm:ml-4'>
          Freely
        </div>
      </div>
      <IconShare
        size={32}
        color='#6466F1'
        stroke={1.8}
        className='mr-6 xs:mr-10 md:mr-16'
        onClick={() => {
          modalHandlers.open()
        }}
      />
    </HeaderWrapper>
  )
}

const SideNav: FC<{ planId: string }> = (props) => {
  const [opened, handlers] = useDisclosure(true)

  return (
    <nav className='hidden sm:block'>
      <div
        style={{ transition: 'all 0.3s' }}
        className={`flex ${
          opened ? 'w-[276px]' : 'w-[90px]'
        } min-h-[calc(100vh-96px)] flex-col justify-between border-solid border-white border-r-slate-200`}
      >
        <NavLinks planId={props.planId} />
        <div className='mb-8 flex flex-col'>
          <hr
            style={{ transition: 'all 0.3s' }}
            className={`mx-2 h-[1px] ${
              opened ? 'w-64' : 'w-[72px]'
            } border-0 bg-slate-300`}
          />
          <UnstyledButton
            onClick={() => handlers.toggle()}
            className='mx-8 mt-2 hover:bg-slate-100'
          >
            {opened ? (
              <div className='flex h-7 items-center gap-2 text-slate-400'>
                <IconArrowLeft color='#AFAFAF' stroke={2} />
                <div className='overflow-hidden text-clip whitespace-nowrap'>
                  折りたたむ
                </div>
              </div>
            ) : (
              <IconArrowRight color='#AFAFAF' stroke={2} />
            )}
          </UnstyledButton>
        </div>
      </div>
    </nav>
  )
}
