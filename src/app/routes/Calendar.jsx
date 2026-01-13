import React from "react";
import useCalendar from "../../hooks/useCalendar";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const Calendar = ({ locale = navigator.language }) => {
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const { startOfMonth, goNext, goPrev, dates, week } = useCalendar(
    new Date(),
    locale
  );

  const handleOnNext = () => {
    goNext();
  };

  const handleOnClick = (rindx, cindx) => {
    //console.log(rindx, cindx);
  };

  return (
    <>
      <div>Basic calendar where user can view upcoming events</div>;
      <button onClick={() => handleOnNext()}>click me</button>
      <h1>Selected Month: {startOfMonth.toLocaleDateString()}</h1>
      <TableContainer
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Table sx={{ width: "50vw", height: "70vh" }}>
          <TableHead>
            <TableRow>
              {weekdays.map((wkd) => (
                <TableCell key={wkd}>{wkd}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {week.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((day, cellIndex) => (
                  <TableCell
                    onClick={() => handleOnClick(rowIndex, cellIndex)}
                    key={(rowIndex, cellIndex)}
                  >
                    {day}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Calendar;
