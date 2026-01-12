import React from "react";
import useCalendar from "../../hooks/useCalendar";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const Calendar = ({ locale = navigator.language }) => {
  const { startOfMonth, goNext, goPrev, dates, weekdays } = useCalendar(
    new Date(),
    locale
  );

  const handleOnNext = () => {
    //console.log("days in this month: ", daysInMonth);
    goPrev();
  };
  const wkd = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const week1 = { Mon: 5, Thu: 1, Fri: 2, Sat: 3, Sun: 4 };
  return (
    <>
      <div>Basic calendar where user can view upcoming events</div>;
      <button onClick={() => handleOnNext()}>click me</button>
      <h1>Selected Month: {startOfMonth.toLocaleDateString()}</h1>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Table sx={{ width: "50px" }}>
          <TableHead>
            <TableRow>
              {weekdays.map((wday) => (
                <TableCell key={wday}>{wday}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow key="week1">
              {wkd.map((wday) => (
                <TableCell key={wday}>{week1[wday] || ""}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </>
  );
};

export default Calendar;
