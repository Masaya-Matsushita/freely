import { Button } from '@mantine/core'
import { FC } from 'react'

type Props = {
  text: string
  onClick: () => void
  narrow?: true
}

/**
 * @package
 */
export const SimpleButton: FC<Props> = (props) => {
  return (
    <Button
      onClick={props.onClick}
      className={`w-56 bg-main-500 text-lg tracking-wider hover:bg-main-400 xs:w-80 xs:rounded-lg ${
        props.narrow ? 'h-12 md:h-14' : 'h-14 md:h-16'
      }`}
    >
      {props.text}
    </Button>
  )
}
