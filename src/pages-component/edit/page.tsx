import { Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useRouter } from 'next/router'
import { PasswordModal } from 'src/component/PasswordModal'

/**
 * @package
 */
export const Edit = () => {
  const router = useRouter()
  const planId = router.query.plan
  const [opened, handlers] = useDisclosure(false)
  return (
    <>
      {typeof planId === 'string' ? (
        <div>
          <PasswordModal
            opened={opened}
            closeModal={handlers.close}
            planId={planId}
          />

          <Button onClick={() => handlers.open()}>password-modal</Button>
        </div>
      ) : null}
    </>
  )
}
