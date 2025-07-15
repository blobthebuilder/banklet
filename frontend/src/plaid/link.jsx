/**
 * Start Link and define the callbacks we will call if a user completes the
 * flow or exits early
 */
export const startLink = async function (customSuccessHandler) {
  const linkTokenData = await fetchLinkToken();
  if (linkTokenData === undefined) {
    return;
  }
  const handler = Plaid.create({
    token: linkTokenData.link_token,
    onSuccess: async (publicToken, metadata) => {
      console.log(`Finished with Link! ${JSON.stringify(metadata)}`);
      await exchangePublicToken(publicToken);
      customSuccessHandler();
    },
    onExit: async (err, metadata) => {
      console.log(
        `Exited early. Error: ${JSON.stringify(err)} Metadata: ${JSON.stringify(
          metadata
        )}`
      );
    },
    onEvent: (eventName, metadata) => {
      console.log(`Event ${eventName}, Metadata: ${JSON.stringify(metadata)}`);
    },
  });
  handler.open();
};

/**
 * To start Link, we need to fetch a Link token from the user. We'll save this
 * as our `linkTokenData` variable defined at the beginning of our file.
 */
const fetchLinkToken = async function () {
  const linkTokenData = await fetch("/api/create_link_token", {
    method: "POST",
  }).then((res) => res.json());
  return linkTokenData;
};

/**
 * Exchange our Link token data for an access token
 */
const exchangePublicToken = async (publicToken) => {
  const formData = new URLSearchParams();
  formData.append("public_token", publicToken);

  const response = await fetch("/api/get_access_token", {
    method: "POST",
    body: formData,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  console.log("Done exchanging our token.");
};
