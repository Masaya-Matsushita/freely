import { FC, ReactNode } from 'react'

type Props = {
  fit?: true
  children: ReactNode
}

/**
 * @package
 */
export const Card: FC<Props> = (props) => {
  return (
    <div
      className={`mx-4 mt-16 rounded-lg bg-white px-6 pt-14 pb-20 shadow shadow-dark-100 xxs:mx-6 xs:mx-auto xs:mt-24 xs:w-[500px] xs:pt-20 xs:pb-28 ${
        props.fit ? 'sm:w-[480px]' : null
      } md:w-[600px]`}
    >
      {props.children}
    </div>
  )
}
