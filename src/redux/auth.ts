import { createSlice } from "@reduxjs/toolkit";

import { ThemeModeEnum } from '@/models/base.model';
import { IUser } from "@/models/user.model";

export interface State {
  mode: ThemeModeEnum,
  user: IUser | null,
  token: string | null,
};

const initialState: State = {
  mode: ThemeModeEnum.Light,
  user: null,
  token: null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleMode: (state: State) => {
      state.mode = state.mode === ThemeModeEnum.Light ? ThemeModeEnum.Dark : ThemeModeEnum.Light;
    },
    setLogin: (state: State, action: any) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state: State) => {
      state.user = null;
      state.token = null;
    },
  }
});

export const { toggleMode, setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;