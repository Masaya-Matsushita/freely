import { useRouter } from 'next/router'

/**
 * @package
 */
export const History = () => {
  const { asPath } = useRouter()

  return (
    <div>
      <div className='text-lg text-red-500'>{asPath}</div>
    </div>
  )
}
