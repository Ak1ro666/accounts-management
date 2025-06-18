import type { FormEvent } from 'react'
import type { SignInFormData } from '../domain/types'

import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/shared/model/routes'
import { appSessionStore } from '@/shared/model/session'

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
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE1MTYyMzkwMjJ9.luvEOkXfBZdktM_5z0tN9yhLloPp3VTZ7XnnivC2ngw'
      )
      navigate(ROUTES.ACCOUNTS)
    } else {
      showErrors()
    }
  }

  return handleSubmit
}
