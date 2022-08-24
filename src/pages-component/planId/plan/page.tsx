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
        pageTitle={'Plan'}
        pageDescription={'旅行のプランに招待されました！'}
        pagePath={'https://freely-azure.vercel.app/123/plan'}
        pageImg={'/Naoshima.JPG'}
      />
      <div className='text-lg text-blue-500'>Hello World!</div>
      <SimpleButton text='btn' onClick={handleClick} narrow />
    </div>
  )
}
