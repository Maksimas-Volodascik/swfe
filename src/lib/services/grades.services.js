import { API_URL } from "../types";

export const gradesBySubject = async (startDate, selectedSubject) => {
  const { data } = await API_URL.get(
    `/Grades?year=${startDate.getFullYear()}&month=${startDate.getMonth() + 1}&classSubjectId=${selectedSubject}`,
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
    const { data } = await API_URL.post("/Grades", grade);
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
    const { data } = await API_URL.patch("/Grades", grade);
    return data;
  } catch (error) {
    if (error.response) {
      return { message: error.response.data?.message };
    }
    return { message: "Network Error" };
  }
};
