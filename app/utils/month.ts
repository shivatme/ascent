import dayjs from "dayjs";

// export function getMonth(month = dayjs().month()) {
//   month = Math.floor(month);
//   const year = dayjs().year();
//   const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
//   let currentMonthCount = 0 - firstDayOfTheMonth;
//   const daysMatrix = new Array(6).fill([]).map(() => {
//     return new Array(7).fill(null).map(() => {
//       currentMonthCount++;
//       return dayjs(new Date(year, month, currentMonthCount));
//     });
//   });
//   return daysMatrix;
// }

const getMonthDays = (currentMonth: Date) => {
  const startOfMonth = currentMonth.startOf("month");
  const endOfMonth = currentMonth.endOf("month");
  const startDayOfWeek = startOfMonth.day();
  const daysInMonth = endOfMonth.date();
  const daysArray = [];

  console.log(daysInMonth);
  // Fill in the previous month's days
  for (let i = startDayOfWeek; i > 0; i--) {
    const prevMonthDay = startOfMonth.subtract(i, "day");
    daysArray.push({ day: prevMonthDay, isCurrentMonth: false });
  }

  // Fill in the current month's days
  for (let i = 1; i <= daysInMonth; i++) {
    const currentMonthDay = startOfMonth.date(i);
    daysArray.push({ day: currentMonthDay, isCurrentMonth: true });
  }

  // Fill in the next month's days to complete the grid
  const endDayOfWeek = endOfMonth.day(); // End day of week (0 = Sunday)
  for (let i = 1; i < 7 - endDayOfWeek; i++) {
    const nextMonthDay = endOfMonth.add(i, "day");
    daysArray.push({ day: nextMonthDay, isCurrentMonth: false });
  }
  // console.log(daysArray);
  return daysArray;
};

export default getMonthDays;
