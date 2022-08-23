import { Button, Paper } from '@mantine/core'
import Image from 'next/image'
import type { FallbackProps } from 'react-error-boundary'
import { useMediaQuery } from '@/lib/mantine'

/**
 * @package
 */
export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const largerThanLg = useMediaQuery('lg')

  return (
    <Paper
      shadow='sm'
      radius='lg'
      withBorder
      className='mt-16 flex max-w-2xl flex-col items-center px-8 py-16 xxs:mx-4 xs:mx-12 sm:mx-auto'
    >
      <Image
        alt=''
        src='/ErrorIcon.svg'
        width={largerThanLg ? '400px' : '300px'}
        height={largerThanLg ? '250px' : '200px'}
      />
      <div className='mt-8 w-52 xxs:w-64 lg:mt-12'>
        <div className='text-center text-xl'>エラーが発生しました</div>
        <div className='flex items-start'>
          <div className='mt-4 whitespace-nowrap text-gray-400'>詳細：</div>
          <div className='mt-4 text-gray-400'>{error.message}</div>
        </div>
        <Button
          variant='light'
          onClick={resetErrorBoundary}
          className='ml-auto mt-8 block tracking-wider'
        >
          再読み込み
        </Button>
      </div>
    </Paper>
  )
}
