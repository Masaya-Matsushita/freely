import {
  Button,
  CloseButton,
  CopyButton,
  Modal,
  UnstyledButton,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconScan, IconShare, IconUnlink } from '@tabler/icons'
import { useQRCode } from 'next-qrcode'
import { FC, ReactElement, ReactNode } from 'react'
import { useRecoilValue } from 'recoil'
import { APP_LINK, getPath } from 'src/lib/const'
import { useMediaQuery } from 'src/lib/mantine'
import { planIdState } from 'src/state/planId'

type WrapperProps = {
  label: string
  icon: ReactElement
  children: ReactNode
}

/**
 * @package
 */
export const ShareModal = () => {
  const { Canvas } = useQRCode()
  const planId = useRecoilValue(planIdState)
  const planUrl = APP_LINK + getPath('PLAN', String(planId))
  const largerThanSm = useMediaQuery('sm')
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        centered
        size='lg'
        classNames={{
          modal: 'p-0 rounded-lg xs:mx-8 mx-4',
        }}
      >
        <div className='mb-1 mt-4 flex items-center'>
          <div className='ml-12 text-xl font-semibold text-dark-500 xxs:ml-4 sm:ml-8 md:text-2xl'>
            メンバーを招待
          </div>
          <CloseButton
            title='閉じる'
            size='md'
            iconSize={32}
            onClick={close}
            className='ml-auto mr-12 xxs:mr-4'
          />
        </div>
        <div className='ml-12 text-sm text-dark-400 xxs:ml-4 xs:text-base sm:ml-8'>
          一緒にプランを作成しよう
        </div>
        <hr className='mb-0 h-[1px] border-0 bg-dark-100' />
        <div className='rounded-b-lg bg-[#EEF0F5] py-12 px-8 sm:pb-20'>
          <Wrapper
            label='リンクを共有する'
            icon={<IconUnlink color='#6466F1' size={26} />}
          >
            <div className='mb-3 w-64 rounded-3xl border-[1px] border-solid border-slate-300 p-1 sm:mb-5 sm:w-80 sm:p-2'>
              <div className='mx-2 overflow-hidden text-clip whitespace-nowrap text-sm font-medium tracking-tight text-dark-500 sm:mx-4'>
                {planUrl}
              </div>
            </div>
            <CopyButton value={planUrl} timeout={2000}>
              {({ copied, copy }) => (
                <Button
                  variant='light'
                  classNames={{
                    root: `border-solid rounded-md h-7 w-36 sm:h-8 sm:w-44 ${
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
          </Wrapper>
          <div className='my-4 flex items-center justify-center'>
            <hr className='mx-4 mb-1 h-[1px] w-12 border-0 bg-main-400' />
            <div className='text-2xl text-main-400'>or</div>
            <hr className='mx-4 mb-1 h-[1px] w-12 border-0 bg-main-400' />
          </div>
          <Wrapper
            label='QRコードから開く'
            icon={<IconScan color='#6466F1' size={28} />}
          >
            <Canvas
              text={planUrl}
              options={{
                type: 'image/jpeg',
                quality: 0.3,
                level: 'M',
                width: 220,
                color: {
                  dark: '#000',
                  light: '#FFF',
                },
              }}
            />
          </Wrapper>
        </div>
      </Modal>
      <UnstyledButton
        onClick={open}
        className='mr-4 rounded-md p-2 hover:bg-main-100 xs:mr-8 md:mr-14'
      >
        <div className='flex items-center gap-3'>
          <IconShare size={26} color='#6466F1' stroke={1.8} />
          <div className='text-sm font-bold tracking-wider text-main-500'>
            {largerThanSm ? 'メンバーを招待' : '招待'}
          </div>
        </div>
      </UnstyledButton>
    </div>
  )
}

const Wrapper: FC<WrapperProps> = (props) => {
  return (
    <div className='relative flex flex-col items-center rounded-2xl bg-white px-4 pb-6 pt-4 shadow shadow-dark-100 sm:mx-8 sm:py-8'>
      <div className='absolute -top-6 left-6 flex h-12 w-12 items-center justify-center rounded-full border-[0.5px] border-solid border-dark-100 bg-main-300'>
        {props.icon}
      </div>
      <div className='mb-2 font-bold text-dark-500 sm:mb-4 sm:text-lg'>
        {props.label}
      </div>
      {props.children}
    </div>
  )
}
