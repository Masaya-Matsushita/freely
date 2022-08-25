import { useRouter } from 'next/router'

/**
 * @package
 */
export const ForgotPassword = () => {
  const { asPath } = useRouter()
  return (
    <div>
      <div className='text-lg text-blue-500'>{asPath}</div>
    </div>
  )
}
