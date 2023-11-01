import { GetTokenSilentlyOptions } from "@auth0/auth0-react";

type TokenGetter = (options?: GetTokenSilentlyOptions) => Promise<string>;
let getAccessTokenSilently: TokenGetter;

export const getToken = () => {
  if (import.meta.env.MODE === "test") {
    return Promise.resolve("fake-token");
  } else {
    if (!getAccessTokenSilently) throw new Error("Authentication error");

    return getAccessTokenSilently();
  }
};

export const setTokenFetcher = (accessTokenSetter: TokenGetter) => {
  getAccessTokenSilently = accessTokenSetter;
};
