import { useRouter } from 'next/router'
import { useErrorHandler } from 'react-error-boundary'
import { Seo } from '@/component/Seo'
import { SimpleButton } from '@/component/SimpleButton'

/**
 * @package
 */
export const Plan = () => {
  const router = useRouter()
  const planId = router.query.planId

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
        pageImg={'/Naoshima.JPG'}
      />
      <div className='text-lg text-blue-500'>Hello World!</div>
      <SimpleButton text='btn' onClick={handleClick} narrow />
    </div>
  )
}
