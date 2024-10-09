import { SkillLevelEnum } from "@/models/skill.model";

export const DEFAULT_ERROR_MESSAGE = 'Something went wrong!';

export const SKILL_LEVEL_OPTIONS = [
  {
    value: SkillLevelEnum.NotApplicable,
    name: "Not Applicable",
  },
  {
    value: SkillLevelEnum.FundamentalAwareness,
    name: "Fundamental Awareness",
  },
  {
    value: SkillLevelEnum.Novice,
    name: "Novice",
  },
  {
    value: SkillLevelEnum.Intermediate,
    name: "Intermediate",
  },
  {
    value: SkillLevelEnum.Advanced,
    name: "Advanced",
  },
  {
    value: SkillLevelEnum.Expert,
    name: "Expert",
  },
];

export const getLevelName = (level: SkillLevelEnum) => {
  const item = SKILL_LEVEL_OPTIONS.find((item: any) => item.value === level);
  return item?.name;
};