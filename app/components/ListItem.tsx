import React from "react";
import { View, StyleSheet, Text } from "react-native";
import AppText from "./AppText";

interface ListItemProps {
  title: string;
}

function ListItem({ title, highLight }: ListItemProps): JSX.Element {
  //   console.log(highLight);
  return (
    <View style={styles.container}>
      <AppText numberOfLines={1} style={styles.title}>
        {title}
      </AppText>
    </View>
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
    // backgroundColor: "red",
    // backgroundColor: "rgba(16, 18, 255, 0.5)",
  },
});

export default ListItem;
