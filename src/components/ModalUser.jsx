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
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTeacher, editTeacher } from "../lib/services/teachers.services";
import { addStudent, editStudent } from "../lib/services/students.services";
import { getClassSubjects } from "../lib/services/classes.services";
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
    classSubject:
      userData && userData.classSubjectId ? userData.classSubjectId : "",
  });
  console.log(userData);
  const { data: classSubjects = [] } = useQuery({
    queryKey: ["classSubjects"],
    queryFn: getClassSubjects,
    staleTime: Infinity,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const actionMap = {
    teacher: {
      create: () => addTeacher(teacherDataPayload(formData)),
      edit: () => editTeacher(teacherDataPayload(formData)),
    },
    student: {
      create: () => addStudent(studentDataPayload(formData)),
      edit: () => editStudent(studentDataPayload(formData)),
    },
  };

  const queryKeyMap = {
    teacher: "teachers",
    student: "students",
  };

  const studentDataPayload = (formData) => ({
    email: formData.email,
    password: formData.password,
    firstName: formData.firstName,
    lastName: formData.lastName,
    classSubject: formData.classSubject,
  });

  const teacherDataPayload = (formData) => ({
    email: formData.email,
    password: formData.password,
    firstName: formData.firstName,
    lastName: formData.lastName,
    dateOfBirth: formData.dateOfBirth,
  });

  const mutation = useMutation({
    mutationFn: async () => {
      return actionMap[userType][isEditMode ? "edit" : "create"];
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
          {userType === "teacher" ? (
            <FormControl fullWidth>
              <InputLabel>Class</InputLabel>
              <Select
                value={formData.classSubject}
                label="Technology"
                name="classSubject"
                onChange={handleChange}
              >
                {classSubjects.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Typography
                        variant="body3"
                        sx={{
                          px: 1,
                          borderRadius: 1,
                        }}
                      >
                        {option.subjectName}
                      </Typography>
                      <Chip label={option.subjectCode} size="small" />
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <TextField
              label="Birth Date"
              type="date"
              value={formData?.dateOfBirth || ""}
              fullWidth
              name="dateOfBirth"
              onChange={handleChange}
            />
          )}
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
