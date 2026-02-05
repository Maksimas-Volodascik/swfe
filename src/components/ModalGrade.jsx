import React, { use } from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, TextField } from "@mui/material";

const style = {
  width: 400,
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export default function ModalGrade({ onClose }) {
  return (
    <Box sx={style}>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        sx={{ textAlign: "center", marginBottom: "15px" }}
      >
        ModalGrade window
      </Typography>
      <TextField
        id="outlined-basic"
        label="Grade"
        variant="outlined"
        size="small"
      />
      <TextField
        id="outlined-basic"
        label="Type"
        variant="outlined"
        size="small"
      />
      <Box sx={{ textAlign: "center" }}>
        <Button color="success" variant="contained">
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
  );
}
