const PATH = {
  INDEX: '/',
  CREATE: '/create',
  HISTORY: '/history',
  PLAN: '/[planId]/plan',
  EDIT: '/[planId]/edit',
  SPOT: '/[planId]/spot',
  PREF_NEWS: '/[planId]/pref-news',
  FORGOT_PASSWORD: '/[planId]/forgot-password',
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
export const getUrl = (pathKey: keyof typeof PATH, ...args: string[]) => {
  return 'https://freely-azure.vercel.app' + getPath(pathKey, args[0], args[1])
}
