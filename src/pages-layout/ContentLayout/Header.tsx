import { Burger, CloseButton, Drawer, UnstyledButton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconShare } from '@tabler/icons'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { NavLinks } from './NavLinks'
import { ShareModal } from './ShareModal'
import { HeaderWrapper } from 'src/pages-layout/HeaderWrapper'

type Props = {
  planId: string
  largerThanSm: boolean
}

/**
 * @package
 */
export const Header: FC<Props> = (props) => {
  const router = useRouter()
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
      <UnstyledButton
        onClick={() => {
          modalHandlers.open()
        }}
        className='mr-4 rounded-md p-2 hover:bg-main-100 xs:mr-8 md:mr-14'
      >
        <div className='flex items-center gap-3'>
          <IconShare size={26} color='#6466F1' stroke={1.8} />
          <div className='text-sm font-bold tracking-wider text-main-500'>
            {props.largerThanSm ? 'メンバーを招待' : '招待'}
          </div>
        </div>
      </UnstyledButton>
    </HeaderWrapper>
  )
}
