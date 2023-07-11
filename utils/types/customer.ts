export type Customers = {
  solution: String
  methodInfo: MethodInfoType
  contact: ContactType
  server: ServerType
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
  path: string
} & id

export type DevicePasswordType = {
  make: string
} & id & UserPassType

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