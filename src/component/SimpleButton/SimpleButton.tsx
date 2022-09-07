import { Button } from '@mantine/core'
import { FC } from 'react'

type Props = {
  text: string
  onClick?: () => void
  type?: 'submit' | 'reset'
  narrow?: true
}

/**
 * @package
 */
export const SimpleButton: FC<Props> = (props) => {
  return (
    <Button
      type={props.type ? props.type : 'button'}
      onClick={props.onClick}
      className={`w-[180px] rounded-md bg-main-400 text-base tracking-wider hover:bg-main-500  xxs:w-56 xs:rounded-lg  ${
        props.narrow ? 'md:h-13 h-11' : 'h-14 xs:w-80 xs:text-lg md:h-16'
      }`}
    >
      {props.text}
    </Button>
  )
}
