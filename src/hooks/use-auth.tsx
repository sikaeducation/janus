import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "@/slices/userSlice";
import { User } from "@/declarations";
import { setTokenFetcher } from "@/utilities/security";

export default function useAuth() {
  const { user, isLoading, isAuthenticated, getAccessTokenSilently } =
    useAuth0<User>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated && user) {
      dispatch(
        setUser({
          "https://sikaeducation.com/roles":
            user?.["https://sikaeducation.com/roles"] || [],
          email: String(user.email),
          name: String(user.name),
          picture: String(user.picture),
          isAuthenticated,
          isLoading,
        }),
      );
    }
  }, [isAuthenticated, isLoading, user, dispatch]);

  setTokenFetcher(getAccessTokenSilently);
}
