import { useErrorHandler } from 'react-error-boundary'
import { SimpleButton } from '@/component/SimpleButton'
import { Seo } from '@/lib/next'

/**
 * @package
 */
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
      <Seo
        pageTitle={'test'}
        pageDescription={
          'これはplanページです。aaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaa'
        }
        pagePath={'https://freely-azure.vercel.app/123/plan'}
        pageImg={'/Naoshima.JPG'}
        pageImgWidth={1920}
        pageImgHeight={1280}
      />
      <div className='text-lg text-blue-500'>Hello World!</div>
      <SimpleButton text='btn' onClick={handleClick} narrow />
    </div>
  )
}
