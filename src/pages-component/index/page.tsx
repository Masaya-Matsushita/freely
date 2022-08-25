import { useRouter } from 'next/router'

/**
 * @package
 */
export const Index = () => {
  const { asPath } = useRouter()

  return (
    <div>
      <div className='text-lg text-red-500'>{asPath}</div>
    </div>
  )
}
