import React from "react";
import useCalendar from "../../hooks/useCalendar";
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const Calendar = ({ locale = navigator.language }) => {
  const { startOfMonth, goNext, goPrev, weekdays, week, today } = useCalendar(
    new Date(),
    "en-US" //implement locale in the future for other languages
  );

  const rowEvents = (day, cellIndex, rowIndex) => {
    const isToday = new Date();
    if (
      day == today &&
      isToday.getMonth() == startOfMonth.getMonth() &&
      isToday.getFullYear() == startOfMonth.getFullYear()
    ) {
      return (
        <TableCell
          sx={{
            verticalAlign: "bottom",
            width: "200px",
            height: "100px",
            fontWeight: "Bold",
          }}
          //onClick={() => handleOnClick(rowIndex, cellIndex)}
          key={(rowIndex, cellIndex)}
        >
          <Box
            sx={{
              textAlign: "center",
              background: "#1C1C1C",
              color: "white",
              borderRadius: "10px",
            }}
          >
            Today
          </Box>
          <Box sx={{ textAlign: "right" }}>{day}</Box>
        </TableCell>
      );
    } else {
      return (
        <TableCell
          sx={{
            textAlign: "right",
            verticalAlign: "bottom",
            width: "200px",
            height: "100px",
          }}
          //onClick={() => handleOnClick(rowIndex, cellIndex)}
          key={(rowIndex, cellIndex)}
        >
          {day}
        </TableCell>
      );
    }
  };

  //<h1>Selected Month: {startOfMonth.toLocaleDateString()}</h1>
  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "40px" }}
      >
        <Box sx={{ width: "10%", float: "left" }}>
          <IconButton onClick={() => goPrev()} variant="contained">
            <ArrowBackIosIcon fontSize="medium" />
          </IconButton>
        </Box>
        <Box sx={{ width: "30%", textAlign: "center" }}>
          <Typography variant="h4">
            {startOfMonth.toLocaleString("default", { month: "long" })}{" "}
            {startOfMonth.getFullYear()}
          </Typography>
        </Box>
        <Box sx={{ width: "10%", float: "left" }}>
          <IconButton
            onClick={() => goNext()}
            variant="contained"
            sx={{ width: "30px", float: "right" }}
          >
            <ArrowForwardIosIcon fontSize="medium" />
          </IconButton>
        </Box>
      </Box>
      <TableContainer
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Table
          sx={{
            maxWidth: "50vw",
            maxHeight: "70vh",
          }}
        >
          <TableHead>
            <TableRow>
              {weekdays.map((wkd) => (
                <TableCell
                  sx={{
                    textAlign: "center",
                    fontFamily: "Segoe UI",
                    fontSize: "15px",
                    width: "200px",
                    height: "100px",
                    fontWeight: "bold",
                  }}
                  key={wkd}
                >
                  {wkd}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {week.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((day, cellIndex) =>
                  rowEvents(day, cellIndex, rowIndex)
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Calendar;
