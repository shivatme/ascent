import React from "react";
import { View, StyleSheet, Text } from "react-native";

interface ExerciseDetailsScreenProps {
  route: any;
}

function ExerciseDetailsScreen({
  route,
}: ExerciseDetailsScreenProps): JSX.Element {
  const { exercise } = route.params;

  console.log(exercise);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{exercise.name}</Text>
      <Text style={styles.text}>{exercise.force}</Text>
      <Text style={styles.text}>{exercise.level}</Text>
      <Text style={styles.text}>{exercise.mechanic}</Text>
      <Text style={styles.text}>{exercise.equipment}</Text>
      <Text style={styles.text}>{exercise.category}</Text>
      <Text style={styles.text}>{exercise.instructions}</Text>
      <Text style={styles.text}>{exercise.primaryMuscles}</Text>
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
