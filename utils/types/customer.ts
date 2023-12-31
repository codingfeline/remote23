export type CustomerType = {
  name: string
  solution?: String
  solutionInfo?: SolutionInfoType[]
  methodInfo?: MethodInfoType[]
  contact?: ContactType[]
  server?: ServerType[]
  serverSetup?: ServerSetupType[]
  devicePassword?: DevicePasswordType[]
  scanFolder?: ScanFolderType[]
  scanEmail?: ScanEmailType[]
  network?: NetworkType[]
} & idName

export type ContactType = {
  tel: string
  email: string
} & idName

export type MethodInfoType = {
  methodName: string
  notes: string
  url: string
} & id & UserPassType


export type ServerType = {
  ip: string
} & idName & UserPassType

export type ServerSetupType = {
  comment: string
  screenshot: string
} & id

export type DevicePasswordType = {
  make: string
} & id & UserPassType

export type ScanFolderType = {
  hostname: string
  folder: string
} & id & UserPassType

export type ScanEmailType = {
  hostname: string
  port: string
} & id & UserPassType

export type NetworkType = {
  name: string
  domain: string
  dns1: string
  _id: string
  dns2?: string
  dns3?: string
  dns?: string
}

export type MethodType = {
  methodName: string
  url: string
  notes: string
} & id & UserPassType

// extensions

export type id = {
  _id?: string
}

export type idName = {
  _id?: string
  name: string
}

export type UserPassType = {
  username: string
  password: string
}

export type SolutionType = {
  _id?: string
  name: string
  meta?: object
}

export type SolutionInfoType = {
  portal: string
  name: string
} & id & UserPassType
// handleClick: () => void
// handleClick: (event: React.MouseEvent<HTMLButtonElement>, item: string) => void