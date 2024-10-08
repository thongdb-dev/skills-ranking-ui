import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessage, MessageType } from "@/models/base.model";

export interface State {
  message: IMessage | null;
};

const initialState: State = {
  message: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setError: (state: State, action: PayloadAction<string>) => {
      state.message = {
        text: action.payload,
        type: MessageType.Error,
      };
    },
    setSuccess: (state: State, action: PayloadAction<string>) => {
      state.message = {
        text: action.payload,
        type: MessageType.Success,
      };
    },
    clearMessage: (state: State) => {
      state.message = null;
    },
  },
});

export const { setSuccess, setError, clearMessage } = uiSlice.actions;
export default uiSlice.reducer;