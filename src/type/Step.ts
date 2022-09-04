export type Step = {
  id: number
  text: string
  subText?: string
  label?: string
  icon?: JSX.Element
  longer?: true
  children: JSX.Element
}
