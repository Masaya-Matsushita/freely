import { IconCheck } from '@tabler/icons'
import { FC } from 'react'
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
  return (
    <div className='mt-2 flex items-start justify-center gap-2 xxs:gap-4 md:mt-6 md:gap-10'>
      <div className='flex flex-col items-center gap-2 md:gap-4'>
        <div
          style={{ transition: 'all 0.4s' }}
          className={`flex h-10 w-10 items-center justify-center rounded-full xxs:h-14 xxs:w-14 md:h-16 md:w-16 ${
            props.active === 'active' ? 'border-solid border-main-500' : null
          } ${props.active === 'filled' ? 'bg-main-500' : 'bg-main-300'}`}
        >
          {props.active === 'filled' ? (
            <IconCheck color='#fff' size={32} />
          ) : (
            <div>
              {props.step.icon ? (
                <div className='flex items-center justify-center'>
                  {props.step.icon}
                </div>
              ) : (
                <div className='text-xl font-bold text-dark-500 xxs:text-2xl'>
                  {props.step.id + 1}
                </div>
              )}
            </div>
          )}
        </div>
        <div
          style={{ transition: 'all 0.4s' }}
          className={`h-40 w-[2px] rounded-sm xs:h-48 md:h-52 md:w-[3px] ${
            props.active === 'filled' ? 'bg-main-400' : 'bg-main-300'
          }`}
        ></div>
      </div>
      <div className='flex max-w-xs flex-1 flex-col gap-1 md:max-w-sm md:gap-2'>
        <div className='text-xl font-bold tracking-wide text-dark-500 md:text-2xl'>
          {props.step.label
            ? `${props.step.label}`
            : `Step ${props.step.id + 1}`}
        </div>
        <div className='mb-4 text-sm text-dark-300 md:mb-6 md:text-base'>
          {props.step.text}
        </div>
        {props.children}
      </div>
    </div>
  )
}
