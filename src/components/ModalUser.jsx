import React, { use } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { addTeacher, editTeacher } from "../lib/services/teachers.services";
import { addStudent, editStudent } from "../lib/services/students.services";

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

  const handleOnSubmit = async () => {
    const response =
      mode === "add"
        ? userType === "teachers"
          ? await addTeacher(formData)
          : await addStudent(formData)
        : userType === "teachers"
          ? await editTeacher(userData.id, formData)
          : await editStudent(userData.id, formData);

    setErrMsg(response.message);
    if (response.message) {
      setErrMsg(response.message);
    } else {
      queryClient.invalidateQueries({ queryKey: [userType] });
      onClose();
    }
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
