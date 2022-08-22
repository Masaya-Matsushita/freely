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

// 動的パスに値を設定
export const getPath = (pathKey: keyof typeof PATH, ...args: string[]) => {
  const val = PATH[pathKey]

  if (!args) {
    return val
  }

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
