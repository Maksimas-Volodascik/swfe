import axios from "axios";
import { api } from "../types";

export const getClassSubjects = async () => {
  const { data } = await api.get(`/class-subjects`);
  return data;
};
