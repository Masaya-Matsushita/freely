import { atom } from 'recoil'

export const planIdState = atom<string | null>({
  key: 'planIdState',
  default: null,
})
