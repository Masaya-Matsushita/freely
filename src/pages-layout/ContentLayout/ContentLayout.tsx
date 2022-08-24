import {
  Burger,
  Button,
  CloseButton,
  CopyButton,
  Drawer,
  Modal,
  Paper,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconShare } from '@tabler/icons'
import Image from 'next/image'
import { NextRouter, useRouter } from 'next/router'
import { FC, ReactElement, useEffect } from 'react'
import { NavLinks } from './NavLinks'
import { getUrl } from 'src/lib/const'
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
    router.events.on('routeChangeStart', drawerHandlers.close)
    return () => {
      router.events.off('routeChangeStart', drawerHandlers.close)
    }
  }, [drawerHandlers, router.events])

  return (
    <HeaderWrapper>
      <ShareModal
        router={router}
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
        <NavLinks />
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

type ShareModalProps = {
  router: NextRouter
  opened: boolean
  close: () => void
}

const ShareModal: FC<ShareModalProps> = (props) => {
  return (
    <Modal
      opened={props.opened}
      onClose={() => props.close()}
      withCloseButton={false}
      classNames={{
        modal: 'p-0 rounded-lg mt-16',
      }}
    >
      <div className='mb-1 mt-4 flex items-center'>
        <div className='ml-4 text-2xl font-semibold text-dark-500'>
          メンバーを招待
        </div>
        <CloseButton
          title='閉じる'
          size='md'
          iconSize={32}
          onClick={() => props.close()}
          className='ml-auto mr-4'
        />
      </div>
      <div className='ml-4 text-dark-400'>一緒にプランを作成しよう</div>
      <hr className='mb-0 h-[1px] border-0 bg-dark-100' />
      <div className='rounded-b-lg bg-[#EEF0F5] py-12 px-8'>
        <Paper
          shadow='sm'
          radius='lg'
          withBorder
          className='flex flex-col items-center space-y-3 px-4 py-6'
        >
          <div className='font-bold text-dark-500'>リンクを共有する</div>
          <Paper radius='lg' withBorder className='w-64 p-1'>
            <div className='mx-2 overflow-hidden  text-clip whitespace-nowrap text-sm font-medium tracking-tight text-dark-500'>
              {getUrl('PLAN', String(props.router.query.planId))}
            </div>
          </Paper>
          <CopyButton
            value={getUrl('PLAN', String(props.router.query.planId))}
            timeout={2000}
          >
            {({ copied, copy }) => (
              <Button
                variant='light'
                classNames={{
                  root: `border-solid rounded-lg h-8 w-36 ${
                    copied
                      ? 'border-green-500 bg-green-100 hover:bg-green-100 text-green-500'
                      : 'border-main-400 bg-main-300 hover:bg-main-300 text-main-500'
                  }`,
                }}
                onClick={copy}
              >
                {copied ? 'コピーしました！' : 'リンクをコピー'}
              </Button>
            )}
          </CopyButton>
        </Paper>
        <div className='my-4 flex items-center justify-center'>
          <hr className='mx-4 mb-1 h-[1px] w-12 border-0 bg-main-400' />
          <div className='text-2xl text-main-400'>or</div>
          <hr className='mx-4 mb-1 h-[1px] w-12 border-0 bg-main-400' />
        </div>
        <Paper
          shadow='sm'
          radius='lg'
          withBorder
          className='flex flex-col items-center space-y-3 px-4 py-6'
        >
          <div className='font-bold text-dark-500'>QRコードから開く</div>
          <Image src='/sample-qr.jpeg' width='200px' height='200px' alt='' />
        </Paper>
      </div>
    </Modal>
  )
}
