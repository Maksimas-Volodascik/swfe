import { api } from "../types";

export const gradesBySubject = async () => {
  const { data } = await api.get(`/Grades`);
  return data;
};
