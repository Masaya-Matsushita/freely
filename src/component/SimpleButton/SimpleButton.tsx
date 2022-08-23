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
      className={`w-48 tracking-wider ${props.narrow ? 'h-10' : 'h-12'}`}
    >
      {props.text}
    </Button>
  )
}
