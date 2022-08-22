import { Button } from '@mantine/core'
import type { NextPage } from 'next'
import { useMediaQuery } from '@/lib/mantine/useMediaQuery'

const Home: NextPage = () => {
  const largerThanXxs = useMediaQuery('xxs')
  const largerThanXs = useMediaQuery('xs')
  const largerThanSm = useMediaQuery('sm')
  const largerThanMd = useMediaQuery('md')
  const largerThanLg = useMediaQuery('lg')
  const largerThanXl = useMediaQuery('xl')

  return (
    <>
      <div className='text-lg text-red-500'>Hello World!</div>
      <Button mt={largerThanXxs ? 'lg' : 'sm'}>btn</Button>
    </>
  )
}

export default Home
