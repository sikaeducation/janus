import { GetTokenSilentlyOptions } from "@auth0/auth0-react";

type TokenGetter = (options?: GetTokenSilentlyOptions) => Promise<string>;
let getAccessTokenSilently: TokenGetter;

export const accessors = {
  getToken: () =>
    !import.meta.env.PROD ? "Fake Token" : getAccessTokenSilently(),
  setTokenFetcher: (accessTokenSetter: TokenGetter) => {
    getAccessTokenSilently = accessTokenSetter;
  },
};

export default accessors;
