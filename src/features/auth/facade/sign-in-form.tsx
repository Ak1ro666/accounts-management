import { ROUTES } from "@/shared/model/routes";

import { SubmitButton } from "../ui/submit-button";
import { SignInFields } from "../ui/sign-in-fields";
import { AuthFormLayout } from "../ui/auth-form-layout";

import { useSignInForm } from "../model/use-sign-in-form";
import { useSignInErrors } from "../model/use-sign-in-errors";

import { useSignInSubmitForm } from "../view-model/use-sign-in-submit-form";
import { useNavigate } from "react-router-dom";
import { appSessionStore } from "@/shared/model/session";

export function SignInForm() {
  const signInForm = useSignInForm();
  const errorsState = useSignInErrors(signInForm.data);
  const handleSubmit = useSignInSubmitForm({
    checkIsValid: errorsState.checkIsValid,
    hideErrors: errorsState.hideErrors,
    showErrors: errorsState.showErrors,
    formData: signInForm.data,
  });

  const navigate = useNavigate();

  appSessionStore.updateSessionStream.useEvent((event) => {
    if (event.type === "update") {
      navigate(ROUTES.ACCOUNTS);
    }
  });

  return (
    <AuthFormLayout
      title="Вход"
      description="Войдите в аккаунт, чтобы начать работу с приложением"
      onSubmit={handleSubmit}
      actions={<SubmitButton>Войти</SubmitButton>}
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
