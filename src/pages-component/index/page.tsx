import { useErrorHandler } from 'react-error-boundary'
import { Seo } from '@/component/Seo'
import { SimpleButton } from '@/component/SimpleButton'

/**
 * @package
 */
export const Index = () => {
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
      <Seo pageImg={'/Naoshima.JPG'} />
      <div className='text-lg text-red-500'>Hello World!</div>
      <SimpleButton text='btn' onClick={handleClick} narrow />
    </div>
  )
}
