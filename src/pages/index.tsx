import { Button } from '@mantine/core'
import type { NextPage } from 'next'
import { useErrorHandler } from 'react-error-boundary'
import { useMediaQuery } from '@/lib/mantine/useMediaQuery'

const Home: NextPage = () => {
  const largerThanXxs = useMediaQuery('xxs')

  const handleError = useErrorHandler()

  const handleClick = () => {
    try {
      throw new Error('Error is occurred!')
    } catch (error: any) {
      handleError(error)
    }
  }

  return (
    <>
      <div className='text-lg text-red-500'>Hello World!</div>
      <Button mt={largerThanXxs ? 'lg' : 'sm'} onClick={handleClick}>
        btn
      </Button>
    </>
  )
}

export default Home
