import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "../slices/userSlice";
import tokenAccessors from "../utilities/security";

const { setTokenFetcher } = tokenAccessors;

export default function useAuth() {
  const { user, isLoading, isAuthenticated, getAccessTokenSilently } =
    useAuth0();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setUser(
        isAuthenticated
          ? {
              ...user,
              isAuthenticated,
              isLoading,
            }
          : {}
      )
    );
  }, [isAuthenticated, isLoading, user]);

  setTokenFetcher(getAccessTokenSilently);
}
