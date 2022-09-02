import { Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useRouter } from 'next/router'
import { PasswordModal } from 'src/component/PasswordModal'
import { SimpleButton } from 'src/component/SimpleButton'
import { getPath } from 'src/lib/const'

/**
 * @package
 */
export const Create = () => {
  const router = useRouter()
  const [opened, handlers] = useDisclosure(false)

  return (
    <div>
      <PasswordModal opened={opened} closeModal={handlers.close} />
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
      <Button onClick={() => handlers.open()}>open</Button>
    </div>
  )
}
