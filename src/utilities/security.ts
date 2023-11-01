import { GetTokenSilentlyOptions } from "@auth0/auth0-react";

type TokenGetter = (options?: GetTokenSilentlyOptions) => Promise<string>;
let getAccessTokenSilently: TokenGetter;

export const getToken = () => {
	if (import.meta.env.MODE === "test") {
		return Promise.resolve("fake-token");
	} else {
		return getAccessTokenSilently();
	}
};
