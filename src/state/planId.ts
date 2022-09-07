import { atom } from 'recoil'

export const planIdState = atom<string | undefined>({
  key: 'planIdState',
  default: undefined,
})
