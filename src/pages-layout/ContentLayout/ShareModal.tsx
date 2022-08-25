import { Button, CloseButton, CopyButton, Modal, Paper } from '@mantine/core'
import { IconScan, IconUnlink } from '@tabler/icons'
import Image from 'next/image'
import { FC, ReactElement, ReactNode } from 'react'
import { getUrl } from 'src/lib/const'

type ShareModalProps = {
  planId: string
  opened: boolean
  close: () => void
}

type WrapperProps = {
  label: string
  icon: ReactElement
  children: ReactNode
}

/**
 * @package
 */
export const ShareModal: FC<ShareModalProps> = (props) => {
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
        <Wrapper
          label='リンクを共有する'
          icon={<IconUnlink color='#6466F1' size={26} />}
        >
          <Paper radius='lg' withBorder className='w-64 p-1'>
            <div className='mx-2 overflow-hidden  text-clip whitespace-nowrap text-sm font-medium tracking-tight text-dark-500'>
              {getUrl('PLAN', props.planId)}
            </div>
          </Paper>
          <CopyButton value={getUrl('PLAN', props.planId)} timeout={2000}>
            {({ copied, copy }) => (
              <Button
                variant='light'
                classNames={{
                  root: `border-solid rounded-md h-7 w-36 ${
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
          <Image src='/sample-qr.jpeg' width='200px' height='200px' alt='' />
        </Wrapper>
      </div>
    </Modal>
  )
}

const Wrapper: FC<WrapperProps> = (props) => {
  return (
    <Paper
      shadow='sm'
      radius='lg'
      withBorder
      className='relative flex flex-col items-center space-y-3 px-4 pb-6 pt-4'
    >
      <div className='absolute -top-6 left-6 flex h-12 w-12 items-center justify-center rounded-full border-[0.5px]  border-solid border-dark-100 bg-main-300'>
        {props.icon}
      </div>
      <div className='font-bold text-dark-500'>{props.label}</div>
      {props.children}
    </Paper>
  )
}
