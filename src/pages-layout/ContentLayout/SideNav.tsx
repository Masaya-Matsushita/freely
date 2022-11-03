import { UnstyledButton } from '@mantine/core'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons'
import { FC } from 'react'
import { NavLinks } from './NavLinks'

/**
 * @package
 */
export const SideNav: FC<{ opened: boolean; toggle: () => void }> = (props) => {
  return (
    <nav
      style={{ transition: 'all 0.3s' }}
      className={`fixed hidden border-[2px] border-solid border-white border-r-slate-200 bg-white sm:block ${
        props.opened ? 'w-[276px]' : 'w-[90px]'
      }`}
    >
      <div className='flex min-h-[calc(100vh-96px)] flex-col justify-between'>
        <div className='mt-2'>
          <NavLinks />
        </div>
        <div className='mb-8 flex flex-col'>
          <hr
            style={{ transition: 'all 0.3s' }}
            className='mx-2 h-[1px] border-0 bg-slate-300'
          />
          <UnstyledButton
            onClick={props.toggle}
            className='mx-6 mt-2 rounded-md py-1 px-2 hover:bg-slate-100'
          >
            {props.opened ? (
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
