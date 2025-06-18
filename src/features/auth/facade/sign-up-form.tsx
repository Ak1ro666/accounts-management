import { ROUTES } from '@/shared/model/routes'

import { useSignUpErrors } from '../model/use-sign-up-errors'
import { useSignUpForm } from '../model/use-sign-up-form'
import { AuthFormLayout } from '../ui/auth-form-layout'
import { SignUpFields } from '../ui/sign-up-fields'
import { SubmitButton } from '../ui/submit-button'
import { useSignUpSubmitForm } from '../view-model/use-sign-up-submit-form'

export function SignUpForm() {
  const signUpForm = useSignUpForm()
  const errorsState = useSignUpErrors(signUpForm.data)
  const handleSubmit = useSignUpSubmitForm({
    checkIsValid: errorsState.checkIsValid,
    hideErrors: errorsState.hideErrors,
    showErrors: errorsState.showErrors,
    formData: signUpForm.data
  })

  return (
    <AuthFormLayout
      title='Регистрация'
      description='Создайте аккаунт, чтобы начать работу с приложением'
      onSubmit={handleSubmit}
      actions={<SubmitButton>Зарегистрироваться</SubmitButton>}
      fields={
        <SignUpFields
          formData={signUpForm.data}
          onChange={signUpForm.onChange}
          errors={errorsState.errors}
        />
      }
      footer={
        <AuthFormLayout.Footer
          separatingText='или'
          footerText={
            <AuthFormLayout.Link
              text='Есть аккаунт?'
              linkText='Войти'
              url={ROUTES.SIGN_IN}
            />
          }
        />
      }
    />
  )
}
