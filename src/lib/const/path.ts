const PATH = {
  INDEX: '/',
  CREATE: '/create',
  PLAN: '/[planId]/plan',
  EDIT: '/[planId]/edit',
  SPOT: '/[planId]/spot',
  WEATHER: '/weather/[pref]',
  COVID19: '/covid19/[pref]',
  SAKE: '/sake/[pref]',
} as const

/**
 * @package
 */
export const getPath = (pathKey: keyof typeof PATH, ...args: string[]) => {
  const val = PATH[pathKey]

  if (!args) {
    return val
  }

  // パスの動的部分を置き換え
  const dirs = val.slice(1).split('/')

  const newPath = dirs.map((dir) => {
    if (dir.startsWith('[')) {
      const replaceDir = args[0]
      args.shift()
      return replaceDir
    }
    return dir
  })

  return '/' + newPath.join('/')
}

/**
 * @package
 */
export const APP_LINK = 'https://freely-azure.vercel.app'
