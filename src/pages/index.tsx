import type { NextPage } from 'next'
import { useErrorHandler } from 'react-error-boundary'
import { SimpleButton } from '@/component/SimpleButton'

const Home: NextPage = () => {
  const handleError = useErrorHandler()

  const handleClick = () => {
    try {
      throw new Error('Error is occurred!')
    } catch (error: any) {
      handleError(error)
    }
  }

  return (
    <div>
      <div className='text-lg text-red-500'>Hello World!</div>
      <SimpleButton text='btn' onClick={handleClick} narrow />
    </div>
  )
}

export default Home
