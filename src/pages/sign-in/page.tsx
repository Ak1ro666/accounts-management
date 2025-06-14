import { SignInForm } from "@/features/auth";
import { useEffect } from "react";

function Page() {
  useEffect(() => {
    import("@/pages/accounts/page"); // prefetching
  }, []);

  return <SignInForm />;
}

export const Component = Page;
