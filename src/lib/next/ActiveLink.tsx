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

  // edit, spotページのとき、planリンクをアクティブにする
  if (asPath.slice(0, 5) === '/edit' || asPath.slice(0, 5) === '/spot') {
    return (
      <Link {...linkProps}>
        {children('/plan' === linkProps.href.toString().slice(0, 5))}
      </Link>
    )
  }

  // 現在のパス(=asPath)と、propsのhrefが一致すればtrue（先頭5字)
  return (
    <Link {...linkProps}>
      {children(asPath.slice(0, 5) === linkProps.href.toString().slice(0, 5))}
    </Link>
  )
}
