import { useCallback, useMemo, useState } from "react";

function useCalendar(date, locale) {
  const [startOfMonth, setStartOfMonth] = useState(
    new Date(date.getFullYear(), date.getMonth(), 1)
  );

  const goNext = useCallback(() => {
    //useCallback needed to prevent infinite loop
    setStartOfMonth(
      (date) => new Date(date.getFullYear(), date.getMonth() + 1, 1)
    );
  }, []);

  const goPrev = useCallback(() => {
    setStartOfMonth(
      (date) => new Date(date.getFullYear(), date.getMonth() - 1, 1)
    );
  }, []);

  let weekdays = Array.from({ length: 7 }, (_, i) => {
    const base = new Date(2025, 11, i + 1); //December 2025 Monday is 1st day of the month
    return base.toLocaleDateString(locale, { weekday: "short" });
  });

  const endOfMonth = new Date(
    startOfMonth.getFullYear(),
    startOfMonth.getMonth() + 1,
    0
  );

  const daysInMonth = endOfMonth.getDate();

  const dates = [];
  const nextDay = new Date(startOfMonth);
  for (let i = 0; i < daysInMonth; i++) {
    nextDay.setDate(startOfMonth.getDate() + i);
    dates.push({
      weekDay: nextDay.toLocaleDateString(locale, { weekday: "short" }),
      date: new Date(
        startOfMonth.getFullYear(),
        startOfMonth.getMonth(),
        i + 1
      ).toLocaleDateString(locale),
      day: i + 1,
    });
  }

  let week = [];
  let tempWeek = [];

  dates.forEach((element) => {
    console.log(element);
    if (element.weekDay === "Sun") {
      tempWeek.push(element.day);
      week.push(tempWeek);
      tempWeek = [];
    } else {
      tempWeek.push(element.day);
    }
    if (element.day === dates.length) {
      week.push(tempWeek);
    }
  });

  let startMonthIndex = 0;
  if (startOfMonth.getDay() === 0) {
    startMonthIndex = 7;
  } else {
    startMonthIndex = startOfMonth.getDay();
  }

  for (let i = 1; i < startMonthIndex; i++) {
    week[0].unshift("");
  }

  return { startOfMonth, goNext, goPrev, dates, weekdays, week };
}

export default useCalendar;
