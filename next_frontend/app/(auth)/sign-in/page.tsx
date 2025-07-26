import React from "react";
import AuthForm from "@/components/AuthForm";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

function SignIn() {
  return (
    <section className="flex-center size-full max-sm:px-6">
      <Link
        href="http://localhost:8080/auth/google/login"
        className={buttonVariants({ variant: "default" })}>
        Continue with Google
      </Link>
      <AuthForm type="sign-in" />
    </section>
  );
}

export default SignIn;
