"use client";

export const startLink = async function (customSuccessHandler: () => void) {
  const linkTokenData = await fetchLinkToken();
  if (!linkTokenData) return;

  const handler = Plaid.create({
    token: linkTokenData.link_token,
    onSuccess: async (publicToken, metadata) => {
      console.log(`Finished with Link! ${JSON.stringify(metadata)}`);
      await exchangePublicToken(publicToken);
      customSuccessHandler();
    },
    onExit: (err, metadata) => {
      console.log(`Exited early.`, err, metadata);
    },
    onEvent: (eventName, metadata) => {
      console.log(`Event ${eventName}`, metadata);
    },
  });

  handler.open();
};

const fetchLinkToken = async function () {
  const res = await fetch("/api/tokens/create_link_token", {
    method: "POST",
    credentials: "include",
  });
  return res.json();
};

const exchangePublicToken = async ({
  publicToken,
  userId,
}: {
  publicToken: string;
  userId: string;
}) => {
  const formData = new URLSearchParams();
  formData.append("public_token", publicToken);
  formData.append("user_id", userId);

  const res = await fetch("/api/tokens/get_access_token", {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to exchange public token");
  return await res.json();
};
