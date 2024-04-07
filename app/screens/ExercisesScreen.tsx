import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, TextInput, Pressable } from "react-native";
import { useFuzzySearchList } from "@nozbe/microfuzz/react";
import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import { Exercise } from "../types";

import DBExercises from "../database/exercises";
import { nanoid } from "@reduxjs/toolkit";

interface ExercisesScreenProps {
  navigation: any;
  route: any;
}

function ExercisesScreen({
  navigation,
  route,
}: ExercisesScreenProps): JSX.Element {
  const { muscleGroup, type, routine_id } = route.params;
  useEffect(() => {
    if (muscleGroup) {
      getMuscleExercise(muscleGroup);
    } else {
      getExercises();
    }
  }, [muscleGroup]);

  const [queryText, setSearchQuery] = useState("");
  const [exerciseList, setExerciseList] = useState<Exercise[]>([]);

  const filteredList = useFuzzySearchList({
    list: exerciseList,
    queryText,
    getText: (item) => [item.name],
    mapResultItem: ({ item, score, matches: [highlightRanges] }) => item,
  });

  async function getExercises() {
    const result = await DBExercises.getAllExercises();
    setExerciseList(result);
  }

  async function getMuscleExercise(primaryMuscle: string) {
    const result = await DBExercises.getMuscleExercise(primaryMuscle);
    setExerciseList(result);
  }

  function handlePress(exercise: Exercise) {
    if (type === "Exercise Details") {
      navigation.navigate("ExerciseDetails", { exercise });
    } else if (type === "Add Exercise") {
      const routineExercise_id = nanoid();
      navigation.navigate("EditRoutine", {
        routineExercise_id,
        routine_id,
        exercise_id: exercise.id,
        exercise_name: exercise.name,
      });
    }
  }
  return (
    <Screen style={styles.container}>
      <View style={{ padding: 5 }}>
        <TextInput
          autoFocus
          style={styles.textInput}
          placeholder="Search"
          placeholderTextColor={"white"}
          onChangeText={setSearchQuery}
          value={queryText}
        />

        <FlatList
          data={filteredList}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <>
              <Pressable onPress={() => handlePress(item)}>
                <ListItem title={item.name} id={item.id} />
              </Pressable>
            </>
          )}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#181c1f",
    paddingHorizontal: 10,
  },
  textInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 40,
    borderRadius: 150,
    color: "white",
    margin: 10,
    paddingHorizontal: 20,
    backgroundColor: "#212a31",
    alignItems: "center",
  },
});

export default ExercisesScreen;
