import { IconArrowLeft } from '@tabler/icons'
import Link from 'next/link'
import { FC } from 'react'
import { SimpleButton } from 'src/component/SimpleButton'
import { getPath } from 'src/lib/const'

type Props = {
  text: string
  onClick: () => void
  narrow?: true
  planId: string
}

/**
 * @package
 */
export const ButtonWithLinkArea: FC<Props> = (props) => {
  return (
    <div className='flex flex-col items-center gap-8 xs:gap-14'>
      <SimpleButton
        text={props.text}
        onClick={props.onClick}
        narrow={props.narrow}
      />
      <Link href={{ pathname: getPath('PLAN'), query: { plan: props.planId } }}>
        <a className='flex items-center gap-1 rounded-md px-6 py-2 tracking-wider text-dark-300 no-underline hover:bg-slate-100 xs:gap-2 xs:px-12 xs:py-3 md:text-lg'>
          <IconArrowLeft stroke={1.5} color='#999999' />
          <div>戻る</div>
        </a>
      </Link>
    </div>
  )
}
