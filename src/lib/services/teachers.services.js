import React from "react";
import axios from "axios";
import { API_URL } from "../types";

export const getTeacherList = async () => {
  const { data } = await API_URL.get(`/teacher`);
  return data;
};

export const editTeacher = async (teacherId, teacherData) => {
  try {
    const { data } = await API_URL.patch(`/teacher/${teacherId}`, teacherData);
    return data;
  } catch (error) {
    if (error.response) {
      return { message: error.response.data?.message };
    }
    return { message: "Network Error" };
  }
};

export const addTeacher = async (teacherData) => {
  try {
    const { data } = await API_URL.post(`/teacher`, teacherData);
    return data;
  } catch (error) {
    if (error.response) {
      return { message: error.response.data?.message };
    }
    return { message: "Network Error" };
  }
};

export const deleteTeacher = async (teacherId) => {
  try {
    const { data } = await API_URL.delete(`/teacher/${teacherId}`);
    return data;
  } catch (error) {
    if (error.response) {
      return { message: error.response.data?.message };
    }
    return { message: "Network Error" };
  }
};
