"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

const PlaidLink = ({ variant }: { variant: string }) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const { getToken, isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    async function fetchLinkToken() {
      if (!isLoaded || !isSignedIn) {
        console.log("not loaded or signed in");
        return;
      }

      const token = await getToken();
      if (!token) {
        console.log("no token");
        return;
      }

      try {
        const data = await createLinkToken(token);
        setToken(data.link_token);
      } catch (error) {
        console.error("Failed to get link token", error);
      }
    }

    fetchLinkToken();
  }, [isLoaded, isSignedIn, getToken]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token) => {
      try {
        const token = await getToken();
        if (!token) {
          throw new Error("User token not available");
        }
        await exchangePublicToken({ publicToken: public_token, token });
        router.push("/"); // or wherever you want to redirect
      } catch (error) {
        console.error("Failed to exchange public token", error);
      }
    },
    [router]
  );

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <Button
      onClick={() => open()}
      disabled={!ready}>
      Add Bank
    </Button>
  );
};

export default PlaidLink;

// Helpers to call your backend API:
const createLinkToken = async (token: string) => {
  const res = await fetch(
    "http://localhost:8080/api/tokens/create_link_token",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) throw new Error("Failed to create link token");
  const data = await res.json();
  return data; // should contain { link_token }
};

async function exchangePublicToken({
  publicToken,
  token,
}: {
  publicToken: string;
  token: string;
}) {
  const formData = new URLSearchParams();
  formData.append("public_token", publicToken);
  const res = await fetch("http://localhost:8080/api/tokens/get_access_token", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to exchange public token");
  return res.json();
}
