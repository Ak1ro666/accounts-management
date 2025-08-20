import { ROUTES } from "@/kernel/routes";

import { useSignInErrors } from "../model/use-sign-in-errors";
import { useSignInForm } from "../model/use-sign-in-form";
import { useUpdateSession } from "../model/use-update-session";
import { AuthFormLayout } from "../ui/auth-form-layout";
import { SignInFields } from "../ui/sign-in-fields";
import { SubmitButton } from "../ui/submit-button";
import { useSignInSubmitForm } from "../view-model/use-sign-in-submit-form";

export function SignInForm() {
  const signInForm = useSignInForm();
  const errorsState = useSignInErrors(signInForm.data);
  const handleSubmit = useSignInSubmitForm({
    checkIsValid: errorsState.checkIsValid,
    hideErrors: errorsState.hideErrors,
    showErrors: errorsState.showErrors,
    formData: signInForm.data,
  });
  useUpdateSession();

  return (
    <AuthFormLayout
      title="Вход"
      description="Войдите в аккаунт, чтобы начать работу с приложением"
      onSubmit={handleSubmit}
      actions={<SubmitButton>Войти</SubmitButton>}
      dataTestId="SignInForm"
      fields={
        <SignInFields
          formData={signInForm.data}
          onChange={signInForm.onChange}
          errors={errorsState.errors}
        />
      }
      footer={
        <AuthFormLayout.Footer
          separatingText="или"
          footerText={
            <AuthFormLayout.Link
              text="Нет аккаунта?"
              linkText="Зарегистрироваться"
              url={ROUTES.SIGN_UP}
            />
          }
        />
      }
    />
  );
}
