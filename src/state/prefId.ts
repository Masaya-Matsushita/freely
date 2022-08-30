import { atom } from 'recoil'

export const prefIdState = atom<string | null>({
  key: 'prefIdState',
  default: null,
})
