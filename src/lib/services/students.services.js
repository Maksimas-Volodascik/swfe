import React from "react";
import axios from "axios";
import { API_URL } from "../types";

export const getStudentList = async () => {
  const { data } = await API_URL.get(`/student`);
  return data;
};

export const editStudent = async (studentId, studentData) => {
  try {
    const { data } = await API_URL.patch(`/student/${studentId}`, studentData);
    return data;
  } catch (error) {
    if (error.response) {
      return { message: error.response.data?.message };
    }

    return { message: "Network Error" };
  }
};

export const addStudent = async (studentData) => {
  try {
    const { data } = await API_URL.post(`/student`, studentData);
    return data;
  } catch (error) {
    if (error.response) {
      return { message: error.response.data?.message };
    }
    return { message: "Network Error" };
  }
};

export const deleteStudent = async (studentId) => {
  try {
    const { data } = await API_URL.delete(`/student/${studentId}`);
    return data;
  } catch (error) {
    if (error.response) {
      return { message: error.response.data?.message };
    }
    return { message: "Network Error" };
  }
};
