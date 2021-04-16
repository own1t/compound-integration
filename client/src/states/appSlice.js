import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    user: null,
    contract_address: "",
  },
  reducers: {
    SET_USER: (state, action) => {
      state.user = action.payload.user;
    },

    SET_CONTRACT_ADDRESS: (state, action) => {
      state.contract_address = action.payload.contract_address;
    },
  },
});

export const { SET_USER, SET_CONTRACT_ADDRESS } = appSlice.actions;

export const GET_USER = (state) => state.app.user;

export const GET_CONTRACT_ADDRESS = (state) => state.app.contract_address;

export default appSlice.reducer;
