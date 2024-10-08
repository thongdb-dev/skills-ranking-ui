import axiosInstance from "@/lib/axiosInstance";
import { ILoginPayload, IRegisterPayload } from "@/models/auth.model";

export const API = {
  register: (payload: IRegisterPayload) => {
    return axiosInstance.post('/auth/register', payload);
  },
  login: (payload: ILoginPayload) => {
    return axiosInstance.post('/auth/login', payload);
  },
};