import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {} as User,
  reducers: {
    setUser: (state, action) => {
      state = { ...action.payload };
      return state;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
