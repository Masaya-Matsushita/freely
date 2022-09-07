export type Step = {
  id: number
  icon: JSX.Element
  label: string
  text: string
  longer?: true
  children: JSX.Element
}
