export type Customers = {
  solution: String
  methodInfo: Object
  contact: contact
  server: server
} & idName

export type contact = {
  tel: string
  email: string
} & idName

export type methodInfo = {
  methodName: string
  notes: string
} & idName


export type server = {
  ip: string
} & idName & userPass

export type serverSetup = {
  comment: string
  screenshot: string
  path: string
} & id

export type devicePassword = {
  make: string
} & id & userPass


// extensions

export type id = {
  _id: string
}

export type idName = {
  _id: string
  name: string
}

export type userPass = {
  username: string
  password: string
}