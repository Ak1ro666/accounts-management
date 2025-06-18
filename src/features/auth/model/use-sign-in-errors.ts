import type { SignInErrors, SignInFormData } from '../domain/types'

import { useState } from 'react'

export function useSignInErrors(formData: SignInFormData) {
  const [isShowErrors, setIsShowErrors] = useState(false)

  const validate = (data: SignInFormData) => {
    const errors: SignInErrors = {}

    if (!data.email) {
      errors.email = errors.email ?? []
      errors.email.push('Email обязателен')
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = errors.email ?? []
      errors.email.push('Email некорректен')
    }

    if (!data.password) {
      errors.password = errors.password ?? []
      errors.password.push('Пароль обязателен')
    } else if (data.password.length < 6) {
      errors.password = errors.password ?? []
      errors.password.push('Пароль должен быть не менее 6 символов')
    }

    return errors
  }

  const checkIsValid = (data: SignInFormData) => {
    const errors = validate(data)
    return Object.keys(errors).length === 0
  }

  const hideErrors = () => setIsShowErrors(false)
  const showErrors = () => setIsShowErrors(true)

  const errors = isShowErrors ? validate(formData) : undefined

  return {
    errors,
    isShowErrors,
    hideErrors,
    showErrors,
    checkIsValid
  } as const
}
