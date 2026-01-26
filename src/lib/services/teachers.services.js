import React from "react";
import axios from "axios";
import { api } from "../types";

export const getTeacherList = async () => {
  try {
    const { data } = await api.get(`/teacher`);
    return data;
  } catch (error) {
    if (error.response) {
      return { message: error.response.data?.message };
    }
    return { message: "Network Error" };
  }
};

export const editTeacher = async (teacherId, teacherData) => {
  try {
    const { data } = await api.patch(`/teacher/${teacherId}`, teacherData);
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
    const { data } = await api.post(`/teacher`, teacherData);
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
    const { data } = await api.delete(`/teacher/${teacherId}`);
    return data;
  } catch (error) {
    if (error.response) {
      return { message: error.response.data?.message };
    }
    return { message: "Network Error" };
  }
};
