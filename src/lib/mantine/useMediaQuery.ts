import { useMediaQuery as useMediaQueryOriginal } from '@mantine/hooks'

// useMediaQueryOriginalの第1引数をブレークポイントの値のみに制限

const map = {
  xxs: '340px',
  xs: '576px',
  sm: '768px',
  md: '992px',
  lg: '1200px',
  xl: '1400px',
} as const

/**
 * @package
 */
export const useMediaQuery = (
  query: keyof typeof map,
  initialValue: Parameters<typeof useMediaQueryOriginal>[1] = true,
) => {
  return useMediaQueryOriginal(`(min-width: ${map[query]})`, initialValue)
}
