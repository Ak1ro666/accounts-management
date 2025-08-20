import type { SignInFormData } from '../domain/types'

import { useState } from 'react'

const initialFormData: SignInFormData = {
  email: '',
  password: '',
  rememberMe: false
}

export function useSignInForm() {
  const [userFormData, setUserFormData] = useState<{
    [K in keyof SignInFormData]?: SignInFormData[K]
  }>({})

  const onChange = (name: string, value: string | boolean) => {
    setUserFormData({
      ...userFormData,
      [name]: value
    })
  }

  const reset = () => {
    setUserFormData({})
  }

  const fullFormData = { ...initialFormData, ...userFormData }

  return {
    data: fullFormData,
    onChange,
    reset
  } as const
}
