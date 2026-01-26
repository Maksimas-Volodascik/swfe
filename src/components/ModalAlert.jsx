import { Box, Button, Modal, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { deleteTeacher } from "../lib/services/teachers.services";
import { deleteStudent } from "../lib/services/students.services";

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

export default function ModalAlert({ userType, userData, open, onClose }) {
  const queryClient = useQueryClient();

  const handleOnDelete = async (userData) => {
    const response =
      userType === "teachers"
        ? await deleteTeacher(userData.id)
        : await deleteStudent(userData.id);

    if (response.message) {
      console.error("Error occured:", response.message);
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
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ textAlign: "center", marginBottom: "15px" }}
        >
          Are you sure?
        </Typography>
        <Box sx={{ textAlign: "center" }}>
          <Button
            color="success"
            variant="contained"
            onClick={() => handleOnDelete(userData)}
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
        </Box>
      </Box>
    </Modal>
  );
}
