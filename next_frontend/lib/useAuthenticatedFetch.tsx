"use client";

import { useAuth } from "@clerk/nextjs";

export function useAuthenticatedFetch() {
  const { getToken } = useAuth();

  const authenticatedFetch = async (input: RequestInfo, init?: RequestInit) => {
    const token = await getToken();
    const headers = new Headers(init?.headers);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    const response = await fetch(input, { ...init, headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  };

  return authenticatedFetch;
}
