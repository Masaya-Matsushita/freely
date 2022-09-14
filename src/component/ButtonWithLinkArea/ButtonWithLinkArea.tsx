import { IconArrowLeft } from '@tabler/icons'
import Link from 'next/link'
import { FC } from 'react'
import { SimpleButton } from 'src/component/SimpleButton'
import { getPath } from 'src/lib/const'

type Props = {
  planId: string
  text: string
  onClick?: () => void
  type?: 'submit' | 'reset'
  narrow?: true
  loading?: boolean
  disabled?: boolean
}

/**
 * @package
 */
export const ButtonWithLinkArea: FC<Props> = (props) => {
  return (
    <div
      className={`flex flex-col items-center ${
        props.narrow ? 'gap-3 xs:gap-4' : 'gap-8 xs:gap-14'
      } `}
    >
      <SimpleButton
        text={props.text}
        onClick={props.onClick}
        type={props.type}
        narrow={props.narrow}
        loading={props.loading}
        disabled={props.disabled}
      />
      <Link href={getPath('PLAN', props.planId)}>
        <a
          className={`flex items-center gap-1 rounded-md px-6 py-2 tracking-wider text-dark-300 no-underline hover:bg-slate-100 xs:gap-2 xs:px-12 xs:py-3  ${
            props.narrow ? null : 'md:text-lg'
          }`}
        >
          <IconArrowLeft stroke={1.3} size='22' color='#999999' />
          <div>戻る</div>
        </a>
      </Link>
    </div>
  )
}
