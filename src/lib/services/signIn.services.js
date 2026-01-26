import React from "react";
import { api } from "../types";

export const signIn = async ({ email, password }) => {
  try {
    const response = await api.post("/user/login", {
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
