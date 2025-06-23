import { createSlice } from "@reduxjs/toolkit";

const initialState: { ing: boolean } = {
	ing: false,
};

const lodingSlice = createSlice({
	name: "loding",
	initialState: initialState,
	reducers: {
		LODING_ON(state) {
			state.ing = true;
		},
		LODING_OFF(state) {
			state.ing = false;
		},
	},
});

export default lodingSlice.reducer;
