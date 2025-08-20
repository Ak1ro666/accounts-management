export type SignInFormData = {
  email: string
  password: string
  rememberMe: boolean
}

export type SignInErrors = { [K in keyof SignInFormData]?: string[] }

export type SignUpFormData = {
  name: string
  email: string
  password: string
  confirmPassword: string
  rememberMe: boolean
}

export type SignUpErrors = { [K in keyof SignUpFormData]?: string[] }
