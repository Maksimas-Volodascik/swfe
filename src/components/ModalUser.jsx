import React, { use } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Modal,
} from "@mui/material";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTeacher, editTeacher } from "../lib/services/teachers.services";
import { addStudent, editStudent } from "../lib/services/students.services";

export default function ModalUser({
  userType,
  isEditMode,
  userData,
  open,
  onClose,
}) {
  if (!open) return null;
  const queryClient = useQueryClient();
  const today = new Date().toISOString().split("T")[0];
  const [errMsg, setErrMsg] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: userData ? userData.name : "",
    lastName: userData ? userData.lastname : "",
    dateOfBirth: userData && userData.birthdate ? userData.birthdate : today,
  });
  console.log(userType);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const createMap = {
    teacher: addTeacher,
    student: addStudent,
  };
  const editMap = {
    teacher: editTeacher,
    student: editStudent,
  };
  const queryKeyMap = {
    teacher: "teachers",
    student: "students",
  };
  const mutation = useMutation({
    mutationFn: async () => {
      if (!isEditMode) {
        return createMap[userType](formData);
      }
      return editMap[userType](userData.id, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeyMap[userType]] });
      onClose();
    },
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Dialog open={open} onClose={onClose}>
        <DialogTitle sx={{ textTransform: "capitalize" }}>
          {isEditMode ? "Edit " + userType : "Add " + userType}
        </DialogTitle>

        <DialogContent dividers>
          {!isEditMode && (
            <Box display="flex" gap={2} mb={2}>
              <TextField
                label="Email"
                autoComplete="off"
                fullWidth
                name="email"
                onChange={handleChange}
                sx={{ flex: 1 }}
              />
              <TextField
                label="Password"
                type="password"
                autoComplete="new-password"
                fullWidth
                name="password"
                onChange={handleChange}
                sx={{ flex: 1 }}
              />
            </Box>
          )}

          <Box display="flex" gap={2} mb={2}>
            <TextField
              label="First Name"
              value={formData?.firstName || ""}
              fullWidth
              name="firstName"
              onChange={handleChange}
              sx={{ flex: 1 }}
            />
            <TextField
              label="Last Name"
              value={formData?.lastName || ""}
              fullWidth
              name="lastName"
              onChange={handleChange}
              sx={{ flex: 1 }}
            />
          </Box>

          <TextField
            label="Birth Date"
            type="date"
            value={formData?.dateOfBirth || ""}
            fullWidth
            name="dateOfBirth"
            onChange={handleChange}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button variant="contained" onClick={() => mutation.mutate()}>
            {isEditMode ? "Save Changes" : "Add " + userType}
          </Button>
        </DialogActions>
      </Dialog>
    </Modal>
  );
}
