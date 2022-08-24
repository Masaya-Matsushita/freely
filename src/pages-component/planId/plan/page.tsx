import { useRouter } from 'next/router'
import { useErrorHandler } from 'react-error-boundary'
import { Seo } from 'src/component/Seo'
import { SimpleButton } from 'src/component/SimpleButton'

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
        pageTitle={'プラン'}
        pageDescription={'旅行のプランに招待されました！'}
      />
      <div className='text-lg text-blue-500'>Hello World!</div>
      <SimpleButton text='btn' onClick={handleClick} narrow />
    </div>
  )
}
