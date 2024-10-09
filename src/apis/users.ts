import axiosInstance from "@/lib/axiosInstance";

export const API = {
  getUser: (userId: string) => {
    return axiosInstance.get(`/users/${userId}`);
  },
};