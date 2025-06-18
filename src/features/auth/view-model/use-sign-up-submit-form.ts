import type { FormEvent } from 'react'
import type { SignUpFormData } from '../domain/types'

export function useSignUpSubmitForm({
  checkIsValid,
  hideErrors,
  showErrors,
  formData
}: {
  checkIsValid: (data: SignUpFormData) => boolean
  hideErrors: () => void
  showErrors: () => void
  formData: SignUpFormData
}) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isValid = checkIsValid(formData)

    if (isValid) {
      hideErrors()
      console.log(formData)
    } else {
      showErrors()
    }
  }

  return handleSubmit
}
