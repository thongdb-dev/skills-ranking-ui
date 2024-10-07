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