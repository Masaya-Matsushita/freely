import { Menu, UnstyledButton } from '@mantine/core'
import { NextLink } from '@mantine/next'
import { IconDots, IconPencil, IconTrash } from '@tabler/icons'
import { FC, useState } from 'react'
import { ConfirmDialog } from 'src/component/ConfirmDialog'
import { useMediaQuery } from 'src/lib/mantine'

/**
 * @package
 */
export const SpotMenu: FC<{ planId: string; spotId: number }> = (props) => {
  const [dialog, setDialog] = useState(false)
  const largerThanMd = useMediaQuery('md')

  const handleDelete = () => {
    console.log('スポット削除')
  }

  return (
    <div>
      <Menu
        shadow='md'
        width={largerThanMd ? 200 : 160}
        position='bottom-end'
        offset={3}
      >
        <Menu.Target>
          <UnstyledButton className='rounded-md px-2 hover:bg-slate-100'>
            <IconDots color='#999999' size={28} />
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            icon={<IconPencil color='#495057' size={20} stroke={1.8} />}
            component={NextLink}
            href={{
              pathname: `/${props.planId}/spot`,
              query: { spot_id: String(props.spotId) },
            }}
            className='text-dark-500'
          >
            編集
          </Menu.Item>
          <Menu.Item
            color='red'
            icon={<IconTrash size={20} stroke={1.6} />}
            onClick={() => setDialog(true)}
          >
            削除
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <ConfirmDialog
        name='スポット'
        opened={dialog}
        close={() => setDialog(false)}
        handleDelete={handleDelete}
      />
    </div>
  )
}
