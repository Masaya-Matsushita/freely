import { UnstyledButton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons'
import { FC } from 'react'
import { NavLinks } from './NavLinks'

/**
 * @package
 */
export const SideNav: FC<{ planId: string }> = (props) => {
  const [opened, handlers] = useDisclosure(true)

  return (
    <nav className='hidden sm:block'>
      <div
        style={{ transition: 'all 0.3s' }}
        className={`flex ${
          opened ? 'w-[276px]' : 'w-[90px]'
        } min-h-[calc(100vh-96px)] flex-col justify-between border-solid border-white border-r-slate-200`}
      >
        <NavLinks planId={props.planId} />
        <div className='mb-8 flex flex-col'>
          <hr
            style={{ transition: 'all 0.3s' }}
            className={`mx-2 h-[1px] ${
              opened ? 'w-64' : 'w-[72px]'
            } border-0 bg-slate-300`}
          />
          <UnstyledButton
            onClick={() => handlers.toggle()}
            className='mx-6 mt-2 rounded-md py-1 px-2 hover:bg-slate-100'
          >
            {opened ? (
              <div className='flex h-7 items-center gap-2 text-slate-400'>
                <IconArrowLeft color='#AFAFAF' stroke={2} />
                <div className='overflow-hidden text-clip whitespace-nowrap'>
                  折りたたむ
                </div>
              </div>
            ) : (
              <IconArrowRight color='#AFAFAF' stroke={2} />
            )}
          </UnstyledButton>
        </div>
      </div>
    </nav>
  )
}
