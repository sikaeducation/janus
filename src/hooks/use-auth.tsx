import {
	useAuth0,
} from "@auth0/auth0-react";
import {
	useDispatch,
} from "react-redux";
import {
	useEffect,
} from "react";
import {
	setUser,
} from "../slices/userSlice";
import tokenAccessors from "../utilities/security";

const {
	setTokenFetcher,
} = tokenAccessors;

export default function useAuth(){
	const {
		user, isLoading, isAuthenticated, getAccessTokenSilently,
	}
		= useAuth0<User>();
	const dispatch = useDispatch();
	useEffect(
		() => {
			if (
				isAuthenticated
			&& user?.email
			&& user?.name
			&& user?.picture
			&& user?.["https://sikaeducation.com/role"]
			) {
				dispatch(setUser({
					"https://sikaeducation.com/role": user["https://sikaeducation.com/role"] || "",
					email: user.email,
					name: user.name,
					picture: user.picture,
					isAuthenticated,
					isLoading,
				}));
			}
		},
		[
			isAuthenticated,
			isLoading,
			user,
			dispatch,
		],
	);

	setTokenFetcher(getAccessTokenSilently);
}
