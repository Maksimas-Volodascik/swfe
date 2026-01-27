import React from "react";
import axios from "axios";
import { api } from "../types";

export const getStudentList = async () => {
  const { data } = await api.get(`/student`);
  return data;
};

export const editStudent = async (studentId, studentData) => {
  try {
    const { data } = await api.patch(`/student/${studentId}`, studentData);
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
    const { data } = await api.post(`/student`, studentData);
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
    const { data } = await api.delete(`/student/${studentId}`);
    return data;
  } catch (error) {
    if (error.response) {
      return { message: error.response.data?.message };
    }
    return { message: "Network Error" };
  }
};
