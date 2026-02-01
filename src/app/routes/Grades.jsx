import * as React from "react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  TextField,
} from "@mui/material";

import useCalendar from "../../hooks/useCalendar";
import { gradesBySubject } from "../../lib/services/grades.services";
import { useQuery } from "@tanstack/react-query";
//import { testClass } from "../../lib/services/classes.services";

const Grades = () => {
  const today = new Date();
  const [viewMode, setViewMode] = React.useState("monthly");
  const [showWeekends, setShowWeekends] = React.useState(true);
  const { daysInMonth, goPrev } = useCalendar(new Date(), "en-US");
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const { data: studentGrades = [], isPending } = useQuery({
    queryKey: ["gradesBySubject"],
    queryFn: gradesBySubject,
    staleTime: 1000 * 60 * 5,
  });

  const onHandleCell = (name, day) => {
    console.log(name, day);
  };

  const onHandleTest = () => {
    goPrev();
  };

  const checkForGrade = (student, day) => {
    for (let grade of student.grades) {
      const date = new Date(grade.gradingDate);
      if (date.getDate() === day) {
        return (
          <TableCell
            sx={{
              borderRight: "1px solid rgba(0, 0, 0, 0.12)",
              padding: 0,
              textAlign: "center",
              width: 40,
              maxWidth: 40,
              height: 40,
              maxHeight: 40,
              color: grade.grade_Type === "default" ? "black" : "red",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.08)",
              },
            }}
            onClick={() => onHandleCell(student.firstName, day)}
            key={`${student.firstName}-${day}`}
          >
            {console.log(grade.grade_Type)}
            {grade.score}
          </TableCell>
        );
      }
    }
    return (
      <TableCell
        sx={{
          borderRight: "1px solid rgba(0, 0, 0, 0.12)",
          padding: 0,
          textAlign: "center",
          width: 40,
          maxWidth: 40,
          height: 40,
          maxHeight: 40,
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.08)",
          },
        }}
        onClick={() => onHandleCell(student.firstName, day)}
        key={`${student.firstName}-${day}`}
      ></TableCell>
    );
  };

  //TODO: make grades table a separate component
  return (
    <Box sx={{ backgroundColor: "gray", height: "100vh", pt: 1 }}>
      <Box sx={{ ml: 4, mt: 5, mr: 4 }}>
        <Paper
          sx={{
            width: "100%",
            mb: 1,
            p: 2,
          }}
        >
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel id="view-mode-label">View Mode</InputLabel>
            <Select
              value={viewMode}
              label="Settings 1"
              onChange={(e) => setViewMode(e.target.value)}
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Settings 2"
            size="small"
            type="date"
            value={new Date().toISOString().slice(0, 10)}
          />
          <Button
            size="small"
            variant="contained"
            onClick={() => onHandleTest()}
          >
            Apply
          </Button>
        </Paper>

        <TableContainer
          component={Paper}
          sx={{
            width: "100%",
          }}
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    borderRight: "1px solid rgba(0, 0, 0, 0.12)",
                  }}
                />
                {days.map((day) => (
                  <TableCell
                    sx={{
                      borderRight: "1px solid rgba(0, 0, 0, 0.12)",
                      width: 40,
                      maxWidth: 40,
                      height: 40,
                      maxHeight: 40,
                      textAlign: "center",
                      padding: 0,
                    }}
                    key={day}
                    align="center"
                  >
                    {day}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {studentGrades.map((student) => (
                <TableRow key={student.firstName + student.lastName}>
                  <TableCell
                    sx={{
                      borderRight: "1px solid rgba(0, 0, 0, 0.12)",
                      maxWidth: 120,
                      width: 120,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    key={student.firstName + student.lastName}
                  >
                    {student.firstName} {student.lastName}
                  </TableCell>

                  {days.map((day) => checkForGrade(student, day))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Grades;
