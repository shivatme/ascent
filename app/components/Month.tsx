import dayjs from "dayjs";
import React from "react";
import { View, StyleSheet, Text } from "react-native";

interface MonthProps {
  month: any;
}

function Month({ month }: MonthProps): JSX.Element {
  const now = dayjs().month();

  return (
    <View style={styles.container}>
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            // <Day day={day} key={idx} rowIdx={i} />

            <Text>{typeof day === "object" ? JSON.stringify(day) : day}</Text>
          ))}
        </React.Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Month;
