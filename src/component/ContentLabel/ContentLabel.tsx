import { FC, ReactNode } from 'react'

/**
 * @package
 */
export const ContentLabel: FC<{ label: string; icon: ReactNode }> = (props) => {
  return (
    <div>
      <div className='flex items-center justify-center gap-2 pt-20 xs:pt-24'>
        {props.icon}
        <div className='text-2xl font-bold tracking-wider text-dark-500 xxs:text-3xl md:text-4xl'>
          {props.label}
        </div>
      </div>
      <hr className='mt-5 h-[3px] w-28 rounded-sm border-0 bg-main-400 xxs:w-36 xs:mt-7 xs:w-44 md:mt-8 md:h-1' />
    </div>
  )
}
