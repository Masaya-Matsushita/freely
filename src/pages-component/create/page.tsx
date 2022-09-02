import { useRouter } from 'next/router'
import { SimpleButton } from 'src/component/SimpleButton'
import { getPath } from 'src/lib/const'

/**
 * @package
 */
export const Create = () => {
  const router = useRouter()

  return (
    <div>
      <div className='mt-20'>
        <SimpleButton
          text='作成する'
          onClick={() => {
            router.push({
              pathname: getPath('PLAN'),
              query: { plan: 'sample_id1' },
            })
          }}
        />
      </div>
    </div>
  )
}
