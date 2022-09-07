import { Burger, CloseButton, Drawer } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { NavLinks } from './NavLinks'
import { ShareModal } from './ShareModal'
import { HeaderWrapper } from 'src/pages-layout/HeaderWrapper'

/**
 * @package
 */
export const Header = () => {
  const router = useRouter()
  const [opened, { open, close }] = useDisclosure(false)

  // パスの変更を検知して Drawer を閉じる処理
  useEffect(() => {
    router.events.on('routeChangeStart', close)
    return () => {
      router.events.off('routeChangeStart', close)
    }
  }, [close, router.events])

  return (
    <HeaderWrapper>
      <Drawer
        opened={opened}
        size={'65%'}
        onClose={close}
        withCloseButton={false}
      >
        <CloseButton
          title='メニューを閉じる'
          size='xl'
          iconSize={32}
          onClick={close}
          className='mt-11 ml-auto mr-4'
        />
        <div className='mt-14 mb-6 ml-10 text-3xl font-medium tracking-wider text-dark-500'>
          Freely
        </div>
        <hr className='mx-2 h-[1px] border-0 bg-dark-100' />
        <NavLinks />
      </Drawer>
      <div className='flex items-center gap-8 xs:ml-4'>
        <Burger
          opened={opened}
          onClick={open}
          title='メニューを開く'
          color='#495057'
          className='ml-6 sm:hidden'
        />
        <div className='text-2xl font-medium tracking-wider text-dark-500 xs:text-3xl xs:font-normal sm:ml-4'>
          Freely
        </div>
      </div>
      <ShareModal />
    </HeaderWrapper>
  )
}
