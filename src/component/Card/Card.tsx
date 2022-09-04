import { FC, ReactNode } from 'react'

type Props = {
  label?: string
  children: ReactNode
}

/**
 * @package
 */
export const Card: FC<Props> = (props) => {
  return (
    <div className='mx-4 mt-12 rounded-lg bg-white px-6 pt-12 pb-24 shadow shadow-dark-100 xs:mx-auto xs:mt-20 xs:w-[550px] xs:pt-16 xs:pb-28 md:w-[650px] md:pt-20'>
      {props.label ? (
        <div className='mx-auto mb-12 max-w-[450px] xs:text-lg md:mb-16 md:max-w-[550px]'>
          {props.label}
        </div>
      ) : null}
      {props.children}
    </div>
  )
}
