"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import { useRouter } from "next/navigation";

const PlaidLink = ({ variant }: { variant: string }) => {
  const router = useRouter();
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    async function fetchLinkToken() {
      try {
        const data = await createLinkToken();
        setToken(data.link_token);
      } catch (error) {
        console.error("Failed to get link token", error);
      }
    }

    fetchLinkToken();
  }, []);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token) => {
      try {
        await exchangePublicToken({ publicToken: public_token });
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
      Connect Bank
    </Button>
  );
};

export default PlaidLink;

// Helpers to call your backend API:
const createLinkToken = async () => {
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

async function exchangePublicToken({ publicToken }: { publicToken: string }) {
  const formData = new URLSearchParams();
  formData.append("public_token", publicToken);
  const res = await fetch("http://localhost:8080/api/tokens/get_access_token", {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to exchange public token");
  return res.json();
}
