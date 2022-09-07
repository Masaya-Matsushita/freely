import { IconCheck } from '@tabler/icons'
import { FC } from 'react'
import { useMediaQuery } from 'src/lib/mantine'
import { Step } from 'src/type/Step'

type Props = {
  active: 'filled' | 'active' | 'blank'
  step: Omit<Step, 'children'>
  children: JSX.Element
}

/**
 * @package
 */
export const Stepper: FC<Props> = (props) => {
  const largerThanXs = useMediaQuery('xs')

  return (
    <div className='mt-2 flex items-start justify-center gap-2 xxs:gap-4 md:mt-6 md:gap-6'>
      <div className='flex flex-col items-center gap-2 md:gap-4'>
        <div
          style={{ transition: 'all 0.2s' }}
          className={`flex h-10 w-10 items-center justify-center rounded-full xxs:h-[52px] xxs:w-[52px] xs:h-14 xs:w-14 md:h-16 md:w-16 ${
            props.active === 'active'
              ? 'border-[1.5px] border-solid border-main-500'
              : null
          } ${props.active === 'filled' ? 'bg-main-500' : 'bg-main-300'}`}
        >
          {props.active === 'filled' ? (
            <IconCheck color='#fff' size={largerThanXs ? 32 : 28} />
          ) : (
            <div className='flex items-center justify-center'>
              {props.step.icon}
            </div>
          )}
        </div>
        <div
          style={{ transition: 'all 0.2s' }}
          className={`${
            props.step.longer
              ? 'h-[420px] md:h-[550px]'
              : 'h-40 xs:h-48 md:h-52'
          } w-[2px] rounded-sm  md:w-[3px] ${
            props.active === 'filled' ? 'bg-main-400' : 'bg-main-300'
          }`}
        ></div>
      </div>
      <div className='flex max-w-xs flex-1 flex-col gap-1 xxs:mt-3 md:mt-4 md:max-w-sm md:gap-2'>
        <div className='text-xl font-bold tracking-wide text-dark-500 md:text-2xl'>
          {props.step.label}
        </div>
        <div className='mb-4 text-sm text-dark-300 md:mb-6 md:text-base'>
          {props.step.text}
        </div>
        {props.children}
      </div>
    </div>
  )
}
