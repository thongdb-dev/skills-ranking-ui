import axiosInstance from "@/lib/axiosInstance";
import { IAddMySkillPayload, ICreateSkillPayload, IUpdateMySkillLevelPayload } from "@/models/skill.model";

export const API = {
  searchSkills: (params: any) => {
    return axiosInstance.get(`/skills/`, { params });
  },
  createSkill: (payload: ICreateSkillPayload) => {
    return axiosInstance.post("/skills", payload);
  },
  searchMySkills: (params: any) => {
    return axiosInstance.get(`/my-skills/`, { params });
  },
  addMySkill: (payload: IAddMySkillPayload) => {
    return axiosInstance.post("/my-skills", payload);
  },
  updateMySkillLevel: (id: string, payload: IUpdateMySkillLevelPayload) => {
    return axiosInstance.put(`/my-skills/${id}/level`, payload);
  },
  deleteMySkill: (id: string) => {
    return axiosInstance.delete(`/my-skills/${id}`);
  },
};