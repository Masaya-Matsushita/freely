import { Button } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconCheck, IconRefresh, IconX } from '@tabler/icons'

/**
 * @package
 */
export const failedAlert = (title: string, message: string) => {
  showNotification({
    id: 'failed',
    autoClose: 5000,
    title: title,
    message: message,
    color: 'red',
    icon: <IconX size={20} />,
    styles: (theme) => ({
      root: {
        backgroundColor: theme.colors.red[0],
        padding: '16px',
      },
      title: { color: theme.colors.gray[7] },
      description: { color: theme.colors.gray[6] },
      closeButton: {
        color: theme.colors.gray[6],
        '&:hover': { backgroundColor: theme.colors.red[1] },
      },
      icon: { width: '28px', height: '28px' },
    }),
  })
}

/**
 * @package
 */
export const successAlert = (message: string) => {
  showNotification({
    id: 'success',
    autoClose: 2000,
    message: message,
    color: 'teal',
    icon: <IconCheck size={20} />,
    styles: (theme) => ({
      root: {
        backgroundColor: theme.colors.teal[0],
      },
      description: { color: theme.colors.gray[7] },
      closeButton: {
        color: theme.colors.gray[6],
        '&:hover': { backgroundColor: theme.colors.teal[1] },
      },
      icon: { width: '28px', height: '28px' },
    }),
  })
}

/**
 * @package
 */
export const reloadAlert = () => {
  showNotification({
    id: 'reload',
    autoClose: false,
    disallowClose: true,
    icon: <IconRefresh size={16} />,
    message: (
      <div className='flex items-center gap-4'>
        <div className='text-dark-500'>ページを更新してください。</div>
        <Button onClick={() => location.reload()} variant='light' size='xs'>
          更新する
        </Button>
      </div>
    ),
    styles: {
      icon: { width: '28px', height: '28px', margin: '8px 16px 8px 8px' },
    },
  })
}
