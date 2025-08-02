import { useAuth } from "@clerk/nextjs";

export function useApiClient() {
  const { getToken, isLoaded, isSignedIn } = useAuth();

  const apiFetch = async (input: string, init?: RequestInit) => {
    if (!isLoaded || !isSignedIn) {
      throw new Error("User is not authenticated");
    }

    const token = await getToken();
    if (!token) {
      throw new Error("No token found");
    }

    return fetch(input, {
      ...init,
      headers: {
        ...(init?.headers || {}),
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  };

  return { apiFetch };
}
