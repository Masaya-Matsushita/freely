import { showNotification } from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons'

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
        backgroundColor: theme.colors.red[1],
        padding: '16px',
      },
      title: { color: theme.colors.gray[7] },
      description: { color: theme.colors.gray[6] },
      closeButton: {
        color: theme.colors.gray[6],
        '&:hover': { backgroundColor: theme.colors.red[2] },
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
    autoClose: 3000,
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
