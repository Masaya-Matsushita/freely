import { useRouter } from 'next/router'
import { Seo } from 'src/component/Seo'

/**
 * @package
 */
export const Spot = () => {
  const { asPath } = useRouter()
  return (
    <div>
      <Seo
        pageTitle={'旅先の情報'}
        pageDescription={'旅行のプランに招待されました！'}
      />
      <div className='text-lg text-blue-500'>{asPath}</div>
    </div>
  )
}
