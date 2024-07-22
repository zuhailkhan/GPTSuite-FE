export interface ILoggedUser {
  username: string
  email: string
  roles: string[]
  jti: number
}

export interface ILoginPayload {
  email: string
  password: string
}
