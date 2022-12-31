import { GetTokenSilentlyOptions } from "@auth0/auth0-react";

type TokenGetter = (options?: GetTokenSilentlyOptions) => Promise<string>;
let getAccessTokenSilently: TokenGetter;

export const accessors = {
  getToken: () =>
    process.env.NODE_ENV === "test" ? getAccessTokenSilently() : "Fake Token",
  setTokenFetcher: (accessTokenSetter: TokenGetter) => {
    getAccessTokenSilently = accessTokenSetter;
  },
};

export default accessors;
