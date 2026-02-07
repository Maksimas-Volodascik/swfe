import { api } from "../types";

export const gradesBySubject = async (startDate) => {
  const { data } = await api.get(
    `/Grades?year=${startDate.getFullYear()}&month=${startDate.getMonth() + 1}`,
  );
  return data;
};

export const addGrade = async (
  score,
  gradingType,
  gradingDate,
  enrollmentId,
  description,
) => {
  const grade = {
    score: score,
    gradeType: gradingType,
    gradingDate: gradingDate,
    enrollmentId: enrollmentId,
  };

  try {
    const { data } = await api.post("/Grades", grade);
    return data;
  } catch (error) {
    if (error.response) {
      return { message: error.response.data?.message };
    }
    return { message: "Network Error" };
  }
};

export const editGrade = async (
  score,
  gradingType,
  gradingDate,
  enrollmentId,
  description,
) => {
  const grade = {
    score: score,
    gradeType: gradingType,
    gradingDate: gradingDate,
    enrollmentId: enrollmentId,
  };
  console.log(grade);
  try {
    const { data } = await api.patch("/Grades", grade);
    return data;
  } catch (error) {
    if (error.response) {
      return { message: error.response.data?.message };
    }
    return { message: "Network Error" };
  }
};
