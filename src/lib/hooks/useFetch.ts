import useSWR from 'swr'

const fetcher = async (input: RequestInfo, init?: RequestInit) => {
  const res = await fetch(input, init)
  return res.json()
}

/**
 * @package
 */
export const useFetch = (url: string) => {
  const { data, error, mutate } = useSWR(url, fetcher)
  return {
    data,
    error,
    isLoading: !data && !error,
    isEmpty: data && data.length === 0,
    mutate,
  }
}
