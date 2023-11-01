import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	"https://sikaeducation.com/role": "",
	email: "",
	name: "",
	picture: "",
	isAuthenticated: false,
	isLoading: false,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: { payload: typeof initialState }) => {
			console.log(action.payload);
			state = {
				...action.payload,
			};
			return state;
		},
	},
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
