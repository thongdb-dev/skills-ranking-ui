import { ActiveEnum, IBaseEntity } from "@/models/base.model";

export interface IUser extends IBaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  active: ActiveEnum;
};