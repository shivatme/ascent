import React from "react";
import { View, StyleSheet, Text } from "react-native";

interface BodyDataScreenProps {}

function BodyDataScreen(props: BodyDataScreenProps): JSX.Element {
  return (
    <View style={styles.container}>
      <Text> Body Data</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default BodyDataScreen;
