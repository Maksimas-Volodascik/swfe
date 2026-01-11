import React from "react";
import useCalendar from "../../hooks/useCalendar";

const Calendar = ({ locale = navigator.language }) => {
  const { startOfMonth, goNext, goPrev } = useCalendar(new Date(), locale);

  const handleOnNext = () => {
    //console.log("days in this month: ", daysInMonth);
    goPrev();
  };
  return (
    <>
      <div>Basic calendar where user can view upcoming events</div>;
      <button onClick={() => handleOnNext()}>click me</button>
      <h1>Selected Month: {startOfMonth.toLocaleDateString()}</h1>
    </>
  );
};

export default Calendar;
