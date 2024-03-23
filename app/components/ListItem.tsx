import React from "react";
import { View, StyleSheet, Text } from "react-native";
import AppText from "./AppText";
import { TouchableOpacity } from "react-native-gesture-handler";

interface ListItemProps {
  title: string;
  id: string;
  onPress?: Function;
}

function ListItem({ title, id, onPress }: ListItemProps): JSX.Element {
  //   console.log(highLight);
  return (
    // <TouchableOpacity onPress={() => console.log(id)}>
    <View style={styles.container}>
      <AppText numberOfLines={1} style={styles.title}>
        {title}
      </AppText>
    </View>
    // </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    borderWidth: 1,
    borderColor: "grey",
    // paddingHorizontal: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 3,
    paddingHorizontal: 8,
  },
  title: {
    textTransform: "capitalize",
    // backgroundColor: "red",
    // backgroundColor: "rgba(16, 18, 255, 0.5)",
  },
});

export default ListItem;
