import { Modal } from "@mui/material";
import React from "react";

const ModalAlert = (open, onClose) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      Alert!
    </Modal>
  );
};

export default ModalAlert;
