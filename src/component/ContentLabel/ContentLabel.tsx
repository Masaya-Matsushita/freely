import { FC, ReactNode } from 'react'

type Props = {
  label: string
  icon: ReactNode
  short?: true
}

/**
 * @package
 */
export const ContentLabel: FC<Props> = (props) => {
  return (
    <div>
      <div
        className={`flex items-center justify-center ${
          props.short ? 'gap-1' : 'gap-2'
        } pt-4 xs:pt-8`}
      >
        {props.icon}
        <div className='text-2xl font-bold tracking-wider text-dark-500 xxs:text-3xl md:text-4xl'>
          {props.label}
        </div>
      </div>
      <hr
        className={`h-[3px] rounded-sm border-0 bg-main-400  ${
          props.short
            ? 'mt-3 w-14 xxs:mt-4 xxs:w-[70px] xs:mt-5 xs:w-20'
            : 'mt-5 w-28 xxs:w-36 xs:mt-7 xs:w-44 md:mt-8 md:h-1'
        }`}
      />
    </div>
  )
}
