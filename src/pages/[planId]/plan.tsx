import { useErrorHandler } from 'react-error-boundary'
import { SimpleButton } from '@/component/SimpleButton'
import { PlanLayout } from '@/pages-layout/PlanLayout'
import { NextPageWithLayout } from '@/type/NextPageWithLayout'

const Plan: NextPageWithLayout = () => {
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

Plan.getLayout = PlanLayout

export default Plan
