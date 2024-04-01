// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Button,
//   FlatList,
// } from "react-native";
// import dayjs from "dayjs";
// import "dayjs/locale/en"; // Import locale for dayjs
// import getMonthDays from "../../utils/month";

// const Calendar = () => {
//   const [currentMonth, setCurrentMonth] = useState(dayjs());

//   const nextMonth = () => {
//     setCurrentMonth(currentMonth.add(1, "month"));
//   };

//   const prevMonth = () => {
//     setCurrentMonth(currentMonth.subtract(1, "month"));
//   };

//   // Function to render each day cell
//   const renderDayCell = ({ day, isCurrentMonth }) => {
//     return (
//       <TouchableOpacity
//         key={day}
//         style={[styles.cell, !isCurrentMonth && styles.nonCurrentMonth]}
//       >
//         <Text
//           style={[
//             styles.cellText,
//             !isCurrentMonth && styles.nonCurrentMonthText,
//           ]}
//         >
//           {day.format("D")}
//         </Text>
//       </TouchableOpacity>
//     );
//   };

//   // Function to render the entire calendar
//   const renderCalendar = () => {
//     const days = getMonthDays(currentMonth);
//     const weeks = [];
//     let week = [];

//     days.forEach((day, index) => {
//       week.push(renderDayCell(day));
//       if ((index + 1) % 7 === 0 || index === days.length - 1) {
//         weeks.push(
//           <View style={styles.weekRow} key={weeks.length}>
//             {week}
//           </View>
//         );
//         week = [];
//       }
//     });

//     return weeks;
//   };
//   const data = getMonthDays(currentMonth);

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Button onPress={prevMonth} title="Prev" />
//         <Text style={styles.headerText}>
//           {currentMonth.format("MMMM YYYY")}
//         </Text>
//         <Button onPress={nextMonth} title="Next" />
//       </View>
//       <View style={styles.calendarContainer}>{renderCalendar()}</View>
//       <FlatList
//         data={data}
//         renderItem={({ item }) => <Text>{JSON.stringify(item.day)} </Text>}
//         numColumns={7}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     top: 100,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 10,
//   },
//   headerText: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   headerButton: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   calendarContainer: {
//     flexDirection: "column",
//   },
//   weekRow: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//   },
//   cell: {
//     flex: 1,
//     aspectRatio: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     // borderWidth: 1,
//     borderColor: "black",
//   },
//   cellText: {
//     fontSize: 16,
//   },
//   nonCurrentMonth: {
//     backgroundColor: "#f0f0f0",
//   },
//   nonCurrentMonthText: {
//     color: "#888",
//   },
// });

// export default Calendar;
