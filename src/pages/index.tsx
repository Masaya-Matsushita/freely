import { ReactElement } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { SimpleButton } from '@/component/SimpleButton'
import { NextPageWithLayout } from '@/type/NextPageWithLayout'

const Top: NextPageWithLayout = () => {
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

Top.getLayout = (page: ReactElement) => {
  return (
    <div>
      <header>ヘッダー</header>
      <main>{page}</main>
    </div>
  )
}

export default Top
