import { FC, ReactNode } from 'react'

/**
 * @package
 */
export const HeaderWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <header className='fixed z-50 flex h-[108px] w-full items-center justify-between border-b border-solid border-white border-b-slate-300 bg-white pt-6 opacity-90 xs:h-24 xs:pt-4'>
      {children}
    </header>
  )
}
