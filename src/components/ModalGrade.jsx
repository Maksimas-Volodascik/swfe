import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  TextField,
  Typography,
  Stack,
} from "@mui/material";

const style = {
  width: 400,
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export default function ModalGrade({ selectedGrade, onClose, onSubmit }) {
  const [gradeData, setGradeData] = useState({
    grade: selectedGrade.grade,
    description: "",
  });
  const [type, setType] = useState("default");

  const handelOnChange = (e) => {
    const { name, value } = e.target;

    if (
      (name === "grade" && value === "") ||
      (/^\d+$/.test(value) && Number(value) >= 1 && Number(value) <= 10)
    ) {
      setGradeData({ ...gradeData, [e.target.name]: value });
    }
    if (name === "description") {
      setGradeData({ ...gradeData, [e.target.name]: value });
    }
  };
  const handleSubmit = () => {
    onSubmit(gradeData.grade, type, gradeData.description);
  };

  return (
    <Box
      sx={{
        width: 260,
        p: 1.5,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1.5,
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 500,
          mb: 1,
          borderBottom: "1px, solid, black",
        }}
      >
        Edit Grade
      </Typography>

      <Stack spacing={1}>
        <TextField
          label="Grade (1-10)"
          type="text"
          size="small"
          value={gradeData.grade}
          name="grade"
          onChange={handelOnChange}
        />
        <ButtonGroup size="small" fullWidth>
          {["default", "test", "project"].map((value) => (
            <Button
              key={value}
              variant={type === value ? "contained" : "outlined"}
              onClick={() => setType(value)}
              sx={{ textTransform: "capitalize" }}
            >
              {value}
            </Button>
          ))}
        </ButtonGroup>
        <TextField
          label="Description"
          multiline
          name="description"
          onChange={handelOnChange}
          sx={{
            "& textarea": {
              resize: "vertical",
            },
          }}
        />
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Button size="small" variant="text" onClick={onClose}>
            Cancel
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={handleSubmit}
            disabled={gradeData.grade === ""}
          >
            Set Grade
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
