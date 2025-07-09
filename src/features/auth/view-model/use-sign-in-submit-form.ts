import type { FormEvent } from 'react'
import type { SignInFormData } from '../domain/types'

import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/kernel/routes'
import { appSessionStore } from '@/kernel/session'

export function useSignInSubmitForm({
  checkIsValid,
  hideErrors,
  showErrors,
  formData
}: {
  checkIsValid: (data: SignInFormData) => boolean
  hideErrors: () => void
  showErrors: () => void
  formData: SignInFormData
}) {
  const navigate = useNavigate()
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isValid = checkIsValid(formData)

    if (isValid) {
      hideErrors()
      appSessionStore.setSessionToken(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE1MTYyMzkwMjJ9.YC7dNOjUXSCdWEStU_BQLBkwQNF9gV7roeRbGK39_aA'
      )
      navigate(ROUTES.ACCOUNTS)
    } else {
      showErrors()
    }
  }

  return handleSubmit
}
