import { Button } from '@mantine/core'
import { NextLink } from '@mantine/next'
import { FC } from 'react'

type Props = {
  href: string
  text: string
  pink?: true
}

/**
 * @package
 */
export const LinkButton: FC<Props> = (props) => {
  return (
    <Button
      component={NextLink}
      variant='light'
      href={props.href}
      className={`h-9 w-[152px] rounded-md border-[1px] border-solid transition-colors duration-300 xxs:h-12 xxs:w-52 xxs:text-lg xxs:font-bold xs:w-60 ${
        props.pink
          ? 'border-pink-400 bg-pink-100/50 text-pink-500 hover:bg-pink-100/70'
          : 'border-main-500 bg-main-300/60 text-main-500 hover:bg-main-300'
      } `}
    >
      {props.text}
    </Button>
  )
}
