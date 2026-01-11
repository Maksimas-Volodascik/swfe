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

  const days = [];
  const nextDay = new Date(startOfMonth);
  for (let i = 0; i < daysInMonth; i++) {
    nextDay.setDate(startOfMonth.getDate() + i);
    days.push({
      weekDay: nextDay.toLocaleDateString(locale, { weekday: "short" }),
      day: new Date(
        startOfMonth.getFullYear(),
        startOfMonth.getMonth(),
        i + 1
      ).toLocaleDateString(locale),
    });
  }
  console.log(days);

  return { startOfMonth, goNext, goPrev, days };
}

export default useCalendar;
