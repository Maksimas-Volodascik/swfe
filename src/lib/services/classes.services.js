import axios from "axios";
import { api } from "../types";
import { getAccessToken } from "../tokenService";

export const getClassSubjects = async () => {
  const { data } = await api.get(`/class-subjects`);
  return data;
};

export const enrollStudent = async (classId) => {
  const token = getAccessToken();

  const response = await api.post("/Enrollments/" + classId, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("Test Class Response:", response.data);
};

// export const getEnrollments = async () => {
//   const token = getAccessToken();
//   const response = await api.post("/Enrollments", null, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   console.log("Test Class Response:", response.data);
// };
