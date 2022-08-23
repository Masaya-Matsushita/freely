import { useErrorHandler } from 'react-error-boundary'
import { SimpleButton } from '@/component/SimpleButton'

export const Plan = () => {
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
      <div className='text-lg text-blue-500'>Hello World!</div>
      <SimpleButton text='btn' onClick={handleClick} narrow />
    </div>
  )
}
