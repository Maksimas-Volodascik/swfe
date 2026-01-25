import React, { use } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { addTeacher } from "../lib/services/teachers.services";
import { addStudent } from "../lib/services/students.services";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export default function ModalUser({ userType, mode, userData, open, onClose }) {
  if (!open) return null;
  const queryClient = useQueryClient();
  const today = new Date().toISOString().split("T")[0];
  const [errMsg, setErrMsg] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: userData ? userData.name : "",
    lastName: userData ? userData.lastname : "",
    dateOfBirth: userData ? userData.birthdate : today,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleOnAddNew = async () => {
    // TODO: check if provided formData is valid
    let response;
    {
      userData
        ? (response = await fetch(
            "https://localhost:7220/api/student/" + userData.id,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                firstName: formData.firstName,
                lastName: formData.lastName,
                dateOfBirth: formData.dateOfBirth,
              }),
            },
          ))
        : (response = await fetch("https://localhost:7220/api/student", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }).catch((error) => {
            return { error: "Network Error" };
          }));
    }

    if (!response.ok) {
      if (response.status === undefined) return { error: "Network Error" };
      else return { error: "Invalid Email or Password" };
    }

    queryClient.invalidateQueries({ queryKey: ["students"] });
  };

  const handleOnSubmit = async () => {
    const response =
      mode === "add"
        ? userType === "teacher"
          ? addTeacher(formData)
          : addStudent(formData)
        : userType === "teacher"
          ? editTeacher(userData.id, formData)
          : editStudent(userData.id, formData);

    console.log(response);
    /*
    const result = await handleOnAddNew();
    if (result != undefined) {
      if (result.error) {
        setErrMsg(result.error);
      }
    } else {
      onClose();
    }*/
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {userData ? "Edit User" : "Add New User"}
        </Typography>
        <form>
          {userData ? (
            ""
          ) : (
            <input
              type="text"
              name="email"
              placeholder="Email"
              autoComplete="new-password"
              onChange={handleChange}
            ></input>
          )}
          <br />
          {userData ? null : (
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="new-password"
              onChange={handleChange}
            ></input>
          )}
          <br />
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          ></input>
          <br />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          ></input>
          <br />
          <input
            type="date"
            name="dateOfBirth"
            placeholder="Date of Birth"
            min="2018-01-01"
            max={today}
            value={formData.dateOfBirth}
            onChange={handleChange}
          ></input>
          <br />
          <Button
            color="success"
            variant="contained"
            onClick={() => handleOnSubmit()}
          >
            Confirm
          </Button>
          <Button
            sx={{ marginLeft: "10px", backgroundColor: "gray" }}
            variant="contained"
            onClick={onClose}
          >
            Close
          </Button>
          <br />
          {errMsg && (
            <div style={{ color: "red", marginTop: "8px" }}>{errMsg}</div>
          )}
        </form>
      </Box>
    </Modal>
  );
}
