import { api } from "../types";

export const gradesBySubject = async (startDate) => {
  console.log(
    `/Grades?year=${startDate.getFullYear()}&month=${startDate.getMonth() + 1}`,
  );
  const { data } = await api.get(
    `/Grades?year=${startDate.getFullYear()}&month=${startDate.getMonth() + 1}`,
  );
  return data;
};
