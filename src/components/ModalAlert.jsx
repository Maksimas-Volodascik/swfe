import { Box, Button, Modal, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import React, { use } from "react";
import { API_URL } from "../lib/types";

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

export default function ModalAlert({ userId, open, onClose }) {
  const queryClient = useQueryClient();

  const handleOnDelete = (userId) => {
    console.log(userId);
    /*
    fetch(API_URL + "/user/" + userId, {
      method: "DELETE",
    });

    queryClient.invalidateQueries({ queryKey: ["students"] }); //Force table refresh
    onClose();*/
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
            onClick={() => handleOnDelete(userId)}
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
