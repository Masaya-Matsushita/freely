import { IconMenu2, IconShare } from '@tabler/icons'
import { ReactElement } from 'react'
import { ErrorBoundary } from 'src/pages-layout/ErrorBoundary'
import { HeaderWrapper } from 'src/pages-layout/HeaderWrapper'

/**
 * @package
 */
export const ContentLayout = (page: ReactElement) => {
  return (
    <ErrorBoundary>
      <Header />
      <main>{page}</main>
      <footer>Footer</footer>
    </ErrorBoundary>
  )
}

const Header = () => {
  return (
    <HeaderWrapper>
      <div className='flex items-center gap-8'>
        <IconMenu2 size={38} stroke={1.8} color='#495057' className='ml-6' />
        <div className='text-3xl font-medium tracking-wider text-dark-500'>
          Freely
        </div>
      </div>
      <IconShare size={34} color='#6466F1' className='mr-6' />
    </HeaderWrapper>
  )
}
