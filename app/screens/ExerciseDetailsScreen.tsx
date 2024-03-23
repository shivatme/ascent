import React from "react";
import { View, StyleSheet, Text } from "react-native";

interface ExerciseDetailsScreenProps {
  route: any;
}

function ExerciseDetailsScreen({
  route,
}: ExerciseDetailsScreenProps): JSX.Element {
  const {
    name,
    force,
    level,
    mechanic,
    equipment,
    category,
    instructions,
    primaryMuscles,
  } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.text}>{force}</Text>
      <Text style={styles.text}>{level}</Text>
      <Text style={styles.text}>{mechanic}</Text>
      <Text style={styles.text}>{equipment}</Text>
      <Text style={styles.text}>{category}</Text>
      <Text style={styles.text}>{instructions}</Text>
      <Text style={styles.text}>{primaryMuscles}</Text>
      {/* <Text style={styles.text}>{}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181c1f",
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
  },
});

export default ExerciseDetailsScreen;
