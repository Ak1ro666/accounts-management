import type { SignUpErrors, SignUpFormData } from '../domain/types'

import { useState } from 'react'

export function useSignUpErrors(formData: SignUpFormData) {
  const [isShowErrors, setIsShowErrors] = useState(false)

  const validate = (data: SignUpFormData) => {
    const errors: SignUpErrors = {}

    if (!data.name) {
      errors.name = errors.name ?? []
      errors.name.push('Имя обязателено')
    } else if (data.name.length < 3) {
      errors.name = errors.name ?? []
      errors.name.push('Имя должно быть не менее 3 символов')
    }

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

    if (!data.confirmPassword) {
      errors.confirmPassword = errors.confirmPassword ?? []
      errors.confirmPassword.push('Подтверждение пароля обязателено')
    } else if (data.confirmPassword !== data.password) {
      errors.confirmPassword = errors.confirmPassword ?? []
      errors.confirmPassword.push('Пароли не совпадают')
    }

    return errors
  }

  const checkIsValid = (data: SignUpFormData) => {
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
