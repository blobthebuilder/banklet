import React from "react";
import { SignIn } from "@clerk/nextjs";

function SignInPage() {
  /*<section className="flex-center size-full max-sm:px-6">
      <Link
        href="http://localhost:8080/auth/google/login"
        className={buttonVariants({ variant: "default" })}>
        Continue with Google
      </Link>
      <AuthForm type="sign-in" />
    </section>
  */
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <SignIn />
    </div>
  );
}

export default SignInPage;
