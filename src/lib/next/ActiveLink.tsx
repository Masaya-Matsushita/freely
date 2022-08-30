import type { LinkProps } from 'next/link'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { FC, ReactElement } from 'react'

type Props = Omit<LinkProps, 'children'> & {
  children: (isActive: boolean) => ReactElement
}

/**
 * @package
 */
export const ActiveLink: FC<Props> = ({ children, ...linkProps }) => {
  const { asPath } = useRouter()

  // 現在のパス(=asPath)と、propsのhrefが一致すればtrue
  // pref-newsページには下層ページがあるため、それぞれ先頭10字を比較
  return (
    <Link {...linkProps}>
      {children(asPath.slice(0, 10) === linkProps.href.toString().slice(0, 10))}
    </Link>
  )
}
