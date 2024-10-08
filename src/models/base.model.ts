import { State as AuthState } from "@/redux/auth";
import { State as UiState } from "@/redux/ui";
export interface IBaseEntity {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};

export enum ActiveEnum {
  Inactive = 0,
  Active = 1,
};

export enum ThemeModeEnum {
  Light = 'light',
  Dark = 'dark',
};

export interface State {
  auth: AuthState;
  ui: UiState;
};

export enum MessageType {
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
};
export interface IMessage {
  text: string;
  type: MessageType;
};