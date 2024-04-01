import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

interface Button1Props {
  onPress: Function;
  title: string;
}

function Button1({ onPress, title }: Button1Props): JSX.Element {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.container} onPress={() => onPress()}>
        <Text>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "grey",
    width: 80,
    height: 80,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Button1;
