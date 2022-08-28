import useSWR from 'swr'

const fetcher = async (input: RequestInfo, init?: RequestInit) => {
  const res = await fetch(input, init)
  return res.json()
}

/**
 * @package
 */
export const PrefNews = () => {
  const { data, error } = useSWR(
    'https://jsonplaceholder.typicode.com/todos/1',
    fetcher,
  )
  console.log(data)

  return <div></div>
}
