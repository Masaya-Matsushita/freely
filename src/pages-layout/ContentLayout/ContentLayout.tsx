import { Burger, CloseButton, Drawer } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconShare } from '@tabler/icons'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { NavLinks } from './NavLinks'
import { ShareModal } from './ShareModal'
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
  const [drawerOpened, drawerHandlers] = useDisclosure(false)
  const [modalOpened, modalHandlers] = useDisclosure(false)

  // パスの変更を検知して Drawer を閉じる処理
  useEffect(() => {
    router.events.on('routeChangeStart', drawerHandlers.close)
    return () => {
      router.events.off('routeChangeStart', drawerHandlers.close)
    }
  }, [drawerHandlers, router.events])

  return (
    <HeaderWrapper>
      {typeof planId === 'string' ? (
        <ShareModal
          planId={planId}
          opened={modalOpened}
          close={modalHandlers.close}
        />
      ) : null}
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
        {typeof planId === 'string' ? <NavLinks planId={planId} /> : null}
      </Drawer>
      <div className='flex items-center gap-8'>
        <Burger
          opened={drawerOpened}
          onClick={() => drawerHandlers.open()}
          title='メニューを開く'
          color='#495057'
          className='ml-6'
        />
        <div className='text-2xl font-medium tracking-wider text-dark-500'>
          Freely
        </div>
      </div>
      <IconShare
        size={32}
        color='#6466F1'
        stroke={1.8}
        className='mr-6'
        onClick={() => {
          modalHandlers.open()
        }}
      />
    </HeaderWrapper>
  )
}
