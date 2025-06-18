import type { SignUpFormData } from '../domain/types'

import { useState } from 'react'

const initialFormData: SignUpFormData = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  rememberMe: false
}

export function useSignUpForm() {
  const [userFormData, setUserFormData] = useState<Partial<SignUpFormData>>({})

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
