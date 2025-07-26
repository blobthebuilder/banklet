"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import { useRouter } from "next/navigation";

const PlaidLink = ({ user, variant }: { user: string; variant: string }) => {
  const router = useRouter();
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    async function fetchLinkToken() {
      try {
        const data = await createLinkToken(user);
        setToken(data.link_token);
      } catch (error) {
        console.error("Failed to get link token", error);
      }
    }

    fetchLinkToken();
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token) => {
      try {
        await exchangePublicToken({ publicToken: public_token, user });
        router.push("/"); // or wherever you want to redirect
      } catch (error) {
        console.error("Failed to exchange public token", error);
      }
    },
    [user, router]
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
      Connect Bank
    </Button>
  );
};

export default PlaidLink;

// Helpers to call your backend API:
const createLinkToken = async (userId: string) => {
  const res = await fetch(
    "http://localhost:8080/api/tokens/create_link_token",
    {
      method: "POST",
      credentials: "include",
    }
  );

  if (!res.ok) throw new Error("Failed to create link token");
  const data = await res.json();
  return data; // should contain { link_token }
};

async function exchangePublicToken({
  publicToken,
  user,
}: {
  publicToken: string;
  user: string;
}) {
  const formData = new URLSearchParams();
  formData.append("public_token", publicToken);
  formData.append("user", user);
  const res = await fetch("http://localhost:8080/api/tokens/get_access_token", {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to exchange public token");
  return res.json();
}
