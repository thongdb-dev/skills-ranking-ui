import { ActiveEnum, IBaseEntity } from "@/models/base.model";
import { IUser } from "@/models/user.model";

export interface ISkill extends IBaseEntity {
  name: string;
  active: ActiveEnum;
};

export interface IMySkill extends IBaseEntity {
  skill: ISkill;
  user: IUser;
  level: SkillLevelEnum;
};

export enum SkillLevelEnum {
  NotApplicable = 0,
  FundamentalAwareness = 1,
  Novice = 2,
  Intermediate = 3,
  Advanced = 4,
  Expert = 5,
};