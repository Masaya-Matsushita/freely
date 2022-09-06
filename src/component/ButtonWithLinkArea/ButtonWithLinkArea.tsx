import { IconArrowLeft } from '@tabler/icons'
import Link from 'next/link'
import { FC } from 'react'
import { SimpleButton } from 'src/component/SimpleButton'
import { getPath } from 'src/lib/const'

type Props = {
  text: string
  onClick: () => void
  planId: string
  low?: true
}

/**
 * @package
 */
export const ButtonWithLinkArea: FC<Props> = (props) => {
  return (
    <div
      className={`flex flex-col items-center ${
        props.low ? 'gap-3 xs:gap-4' : 'gap-8 xs:gap-14'
      } `}
    >
      <SimpleButton
        text={props.text}
        onClick={props.onClick}
        narrow={props.low}
      />
      <Link href={getPath('PLAN', props.planId)}>
        <a
          className={`flex items-center gap-1 rounded-md px-6 py-2 tracking-wider text-dark-300 no-underline hover:bg-slate-100 xs:gap-2 xs:px-12 xs:py-3  ${
            props.low ? null : 'md:text-lg'
          }`}
        >
          <IconArrowLeft stroke={1.3} size='22' color='#999999' />
          <div>戻る</div>
        </a>
      </Link>
    </div>
  )
}
