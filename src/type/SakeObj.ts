type Sake = {
  name: string
  en: string
  makerName: string
  makerUrl: string | null
}[]

export type SakeObj = {
  sakeHokkaido: Sake
}
