import { atom } from 'recoil'

export const planIdState = atom<string>({
  key: 'planIdState',
  default: '',
})
