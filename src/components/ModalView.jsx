import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

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

export default function ModalView({ open, onClose }) {
  if (!open) return null;
  const queryClient = useQueryClient();
  const today = new Date().toISOString().split("T")[0];
  const [errMsg, setErrMsg] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    date_of_birth: today,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleOnAddNew = async () => {
    // TODO: check if provided formData is valid

    const response = await fetch("https://localhost:7220/api/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).catch((error) => {
      console.log("error: " + error);
      return { error: "Network Error" };
    });

    if (!response.ok) {
      if (response.status === undefined) return { error: "Network Error" };
      else return { error: "Invalid Email or Password" };
    }

    console.log("Add new pressed", response);
    queryClient.invalidateQueries({ queryKey: ["students"] });
  };

  const handleOnSubmit = async () => {
    const result = await handleOnAddNew();
    console.log(result);
    if (result != undefined) {
      if (result.error) {
        setErrMsg(result.error);
      }
    } else {
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
          Add New User
        </Typography>
        <form>
          <input
            type="text"
            name="email"
            placeholder="Email"
            autoComplete="new-password"
            onChange={handleChange}
          ></input>
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="new-password"
            onChange={handleChange}
          ></input>
          <br />
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            onChange={handleChange}
          ></input>
          <br />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            onChange={handleChange}
          ></input>
          <br />
          <input
            type="date"
            name="date_of_birth"
            placeholder="Date of Birth"
            min="2018-01-01"
            max={today}
            onChange={handleChange}
          ></input>
          <br />
          <Button
            color="success"
            variant="contained"
            onClick={() => handleOnSubmit()}
          >
            Add new
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
