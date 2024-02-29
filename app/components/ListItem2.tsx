import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "./AppText";

interface ListItem2Props {
  id: string;
  title: string;
}

function ListItem2({ id, title }: ListItem2Props): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <AppText>Sat</AppText>
      </View>
      <AppText>{title}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    // marginVertical:
    height: 60,
    alignItems: "center",
    backgroundColor: "#181c1f",
  },
  circle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    borderRadius: 100,
    height: 50,
    width: 50,
    margin: 10,
  },
});

export default ListItem2;
