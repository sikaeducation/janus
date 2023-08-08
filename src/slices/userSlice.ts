import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    name: "",
    picture: "",
    isAuthenticated: false,
    isLoading: false,
  } as User,
  reducers: {
    setUser: (state, action) => {
      state = { ...action.payload };
      return state;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
