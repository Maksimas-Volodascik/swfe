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
  Popover,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import useCalendar from "../../hooks/useCalendar";
import { addGrade, gradesBySubject } from "../../lib/services/grades.services";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ModalGrade from "../../components/ModalGrade";

const Grades = () => {
  const queryClient = useQueryClient();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCellId, setSelectedCellId] = useState(0, 0);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const { daysInMonth, goPrev, goNext, startOfMonth } = useCalendar(
    new Date(),
    "en-US",
  );
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const { data: studentGrades = [] } = useQuery({
    queryKey: ["gradesBySubject", startOfMonth],
    queryFn: () => gradesBySubject(startOfMonth),
    staleTime: 1000 * 60 * 5,
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedCellId(0, 0);
  };

  const handleOnSubmit = (grade, type, description) => {
    const gradingDate = new Date(
      startOfMonth.getFullYear(),
      startOfMonth.getMonth(),
      selectedCellId.day,
    );
    addGrade(
      grade,
      type,
      gradingDate.toISOString(),
      selectedCellId.enrollmentId,
      description,
    );
    queryClient.invalidateQueries({
      queryKey: ["gradesBySubject", startOfMonth],
    });
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
            //onClick={() => onHandleCell(student.enrollmentId, day)} //TODO: open edit grade modal
            //onClick={() => (setIsOpen(true), setSelectedGrade(grade))}
            key={`${student.firstName}-${day}`}
          >
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
          backgroundColor:
            selectedCellId.enrollmentId === student.enrollmentId &&
            selectedCellId.day === day
              ? "rgba(0, 0, 0, 0.12)"
              : "transparent",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.08)",
          },
        }}
        aria-describedby={id}
        //onClick={() => onHandleCell(student.enrollmentId, day)} //TODO: open add grade modal
        onClick={(event) => {
          handleClick(event);
          setSelectedCellId({ enrollmentId: student.enrollmentId, day });
        }}
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
            p: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button onClick={() => goPrev()}>
              <KeyboardArrowLeftIcon />
            </Button>

            <Box
              sx={{
                textAlign: "center",
                userSelect: "none",
                width: "115px",
                maxWidth: "115px",
                fontSize: "15px",
              }}
            >
              {startOfMonth.toLocaleString("default", { month: "long" })}{" "}
              {startOfMonth.getFullYear()}
            </Box>

            <Button onClick={() => goNext()}>
              <KeyboardArrowRightIcon />
            </Button>
          </Box>
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
                    width: 120,
                    maxWidth: 120,
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

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <ModalGrade
          onClose={handleClose}
          onSubmit={(grade, type, description) =>
            handleOnSubmit(grade, type, description)
          }
        />
      </Popover>
    </Box>
  );
};

export default Grades;
