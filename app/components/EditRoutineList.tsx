import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import AppText from "./AppText";
import Icon from "./Icon";
import { RoutineExercise } from "../types";

interface ListItem3Props {
  name?: string;
  id?: string;
  onPress?: Function;
  sets_data?: string;
  onDelete?: Function;
  quantity?: number;
  onPressMinus: Function;
  onPressPlus: Function;
  item: RoutineExercise;
}

function ListItem3({
  item,
  onDelete,
  sets_data,
  onPressMinus,
  onPressPlus,
}: ListItem3Props): JSX.Element {
  const setsData = item.sets_data;
  const numberOfSets = Object.keys(setsData).length;
  return (
    <View style={styles.container}>
      <AppText numberOfLines={1} style={styles.name}>
        {item.name}
      </AppText>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon name={"minus"} onPress={() => onPressMinus(item.id)} />
        <AppText style={styles.quantity}>{numberOfSets}</AppText>
        <Icon name={"plus"} onPress={() => onPressPlus(item.id)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "grey",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 3,
    paddingHorizontal: 8,
  },
  quantity: {
    paddingHorizontal: 11,
    fontSize: 14,
  },
  box: {
    width: 100,
    height: 50,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
  },
  name: {
    textTransform: "capitalize",
  },
});

export default ListItem3;
