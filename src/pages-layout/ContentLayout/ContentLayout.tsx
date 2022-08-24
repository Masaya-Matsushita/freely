import { Burger, CloseButton, Drawer } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { NavLinks } from './NavLinks'
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
  const [drawerOpened, drawerHandlers] = useDisclosure(false)
  const [modalOpened, modalHandlers] = useDisclosure(true)

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
        <NavLinks />
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
