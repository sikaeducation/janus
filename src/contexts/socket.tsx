import {
	createContext,
} from "react";
import io, {
	Socket,
} from "socket.io-client";

import {
	useAuth0,
} from "@auth0/auth0-react";

export const SocketContext = createContext({
} as unknown as Socket);

type props = {
  children: JSX.Element;
};

export function SocketProvider({
	children,
}: props){
	const {
		getAccessTokenSilently,
	} = useAuth0();
	const socket = io(
		process.env.REACT_APP_API_BASE_URL || "",
		{
			auth: (callback: (params: { token: string }) => void) => {
				getAccessTokenSilently({
					audience: process.env.REACT_APP_API_AUTH_URI,
				})
					.then((token) => {
						callback({
							token,
						});
					});
			},
		},
	);

	return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
	);
}
