import { FC, ReactNode } from 'react'

/**
 * @package
 */
export const HeaderWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <header className='flex h-[108px] items-center justify-between border-b border-solid border-white border-b-slate-300 pt-6'>
      {children}
    </header>
  )
}
