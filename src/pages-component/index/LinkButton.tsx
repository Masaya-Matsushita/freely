import { Button } from '@mantine/core'
import { NextLink } from '@mantine/next'
import { getPath } from 'src/lib/const'

/**
 * @package
 */
export const LinkButton = () => {
  return (
    <Button
      component={NextLink}
      variant='light'
      href={getPath('CREATE')}
      className='rounded-md border-[1px] border-solid border-main-500 bg-main-300/80 text-main-500 transition-colors duration-300 hover:bg-main-300 xxs:h-12 xxs:w-52 xxs:text-lg xxs:font-bold xs:w-60'
    >
      プランを新規作成
    </Button>
  )
}
