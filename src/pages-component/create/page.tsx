import { useRouter } from 'next/router'
import { SimpleButton } from 'src/component/SimpleButton'
import { getPath } from 'src/lib/const'

/**
 * @package
 */
export const Create = () => {
  const { push } = useRouter()

  return (
    <>
      <div className='mt-20'>
        <SimpleButton
          text='作成する'
          onClick={() => {
            push({
              pathname: getPath('PLAN'),
              query: { plan: 'sample_id1' },
            })
          }}
        />
      </div>
    </>
  )
}
