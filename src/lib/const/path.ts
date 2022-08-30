const PATH = {
  INDEX: '/',
  CREATE: '/create',
  HISTORY: '/history',
  PLAN: '/plan',
  EDIT: '/edit',
  SPOT: '/spot',
  WEATHER: '/pref-news/weather',
  COViD19: '/pref-news/covid19',
  SAKE: '/pref-news/sake',
  FORGOT_PASSWORD: '/forgot-password',
} as const

/**
 * @package
 */
export const getPath = (
  pathKey: keyof typeof PATH,
  planId?: string,
  spotId?: string,
) => {
  const path = PATH[pathKey]

  if (spotId) {
    return path + '?plan=' + planId + '&spot=' + spotId
  }

  if (planId) {
    return path + '?plan=' + planId
  }

  return path
}

/**
 * @package
 */
export const APP_DOMAIN = 'https://freely-azure.vercel.app'
