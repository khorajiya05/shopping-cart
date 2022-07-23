import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateType = {
  uid?: string;
  photo?: string;
  displayName?: string;
  email?: string;
};

const initialState = {} as InitialStateType;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      state: InitialStateType,
      action: PayloadAction<InitialStateType>
    ) => {
      state.email = action.payload.email;
      state.photo = action.payload.photo;
      state.uid = action.payload.uid;
      state.displayName = action.payload.displayName;
    },
    logout: (state: InitialStateType) => {
      delete state.displayName;
      delete state.email;
      delete state.uid;
      delete state.photo;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
