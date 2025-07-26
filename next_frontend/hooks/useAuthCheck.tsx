"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function useAuthCheck() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/auth/check", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          router.push("/dashboard");
        } else {
          router.push("/sign-in");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/sign-in");
      }
    };

    checkAuth();
  }, [router]);
}
