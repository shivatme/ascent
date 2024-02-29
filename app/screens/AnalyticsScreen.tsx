import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Screen from "../components/Screen";

interface AnalyticsScreenProps {}

function AnalyticsScreen(props: AnalyticsScreenProps): JSX.Element {
  return (
    <Screen style={styles.container}>
      <Text>dsasd</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AnalyticsScreen;
