import axiosInstance from "@/lib/axiosInstance";
import { ICreateSkillPayload } from "@/models/skill.model";

export const API = {
  searchSkills: (params: any) => {
    return axiosInstance.get(`/skills/`, { params });
  },
  createSkill: (payload: ICreateSkillPayload) => {
    return axiosInstance.post("/skills", payload);
  },
};