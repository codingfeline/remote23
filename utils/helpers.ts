export const solutions: string[] = [
  'Equitrac', 'PaperCut', 'Safecom', 'EOP', 'Cirrato', 'Other', 'None'
]

export const vpns: string[] = [
  'Cisco AnyConnect', 'VMWare', 'FortiClient', 'Other', 'GlobalProtect', 'TeamViewer'
]

export type TextInputProps = {
  value: string
  name: string
  type?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}