export type Step = {
  id: number
  text: string
  label?: string
  icon?: JSX.Element
  longer?: true
  children: JSX.Element
}
