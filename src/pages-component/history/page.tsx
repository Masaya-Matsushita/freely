import { useRouter } from 'next/router'
import { Seo } from 'src/component/Seo'

/**
 * @package
 */
export const History = () => {
  const { asPath } = useRouter()

  return (
    <div>
      <Seo />
      <div className='text-lg text-red-500'>{asPath}</div>
    </div>
  )
}
