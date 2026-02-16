import React from "react";
import { API_URL } from "../types";

export const signIn = async ({ email, password }) => {
  try {
    const response = await API_URL.post("/user/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("INVALID_CREDENTIALS");
    }

    throw new Error("NETWORK_ERROR");
  }
};
