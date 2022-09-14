import { Button, Modal } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons'
import { FC } from 'react'

type Props = {
  name: string
  opened: boolean
  close: () => void
  handleDelete: () => void
}

/**
 * @package
 */
export const ConfirmDialog: FC<Props> = (props) => {
  return (
    <Modal
      opened={props.opened}
      onClose={props.close}
      withCloseButton={false}
      overlayOpacity={0.3}
      overlayBlur={2}
      centered
      classNames={{ modal: 'xxs:w-80 px-2 xxs:p-8 rounded-xl md:w-96 md:p-10' }}
    >
      <div className='flex items-end justify-center gap-1'>
        <IconAlertCircle color='#fa5252' stroke={1.4} size={30} />
        <div className='whitespace-nowrap text-dark-600'>
          この{props.name}を削除しますか？
        </div>
      </div>
      <div className='mt-8 flex justify-center gap-5 md:mt-10 md:gap-6'>
        <Button
          color='gray'
          variant='light'
          onClick={props.close}
          className='h-10 w-[102px] border-dark-100 font-bold md:h-11 md:w-[120px]'
        >
          Cancel
        </Button>
        <Button
          color='red'
          onClick={props.handleDelete}
          className='h-10 w-[102px] font-bold md:h-11 md:w-[120px]'
        >
          削除
        </Button>
      </div>
    </Modal>
  )
}
