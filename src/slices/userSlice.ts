import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  "https://sikaeducation.com/roles": "",
  email: "",
  name: "",
  picture: "",
  isAuthenticated: false,
  isLoading: false,
};

type Payload = {
  "https://sikaeducation.com/roles": string[];
  email: string;
  name: string;
  picture: string;
  isAuthenticated: boolean;
  isLoading: boolean;
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: { payload: Payload }) => {
      return {
        ...action.payload,
        "https://sikaeducation.com/roles":
          action.payload["https://sikaeducation.com/roles"].join(","),
      };
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
