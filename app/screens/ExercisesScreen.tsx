import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TextInput,
  Pressable,
} from "react-native";
import { useFuzzySearchList, Highlight } from "@nozbe/microfuzz/react";
import createFuzzySearch from "@nozbe/microfuzz";
import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import { useSQLiteContext } from "expo-sqlite/next";

interface ExercisesScreenProps {
  navigation: any;
  route: any;
}
interface Exercise {
  name: string;
  force: string;
  level: string;
  mechanic: string;
  equipment: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  instructions: string[];
  category: string;
  images: string[];
  id: string;
}

function ExercisesScreen({
  navigation,
  route,
}: ExercisesScreenProps): JSX.Element {
  const db = useSQLiteContext();

  const { item, type, id } = route.params;
  useEffect(() => {
    if (item) {
      getMuscleExercise(item);
    } else {
      getExercises();
    }
  }, [item]);

  const [queryText, setSearchQuery] = useState("");
  const [exerciseList, setExerciseList] = useState<Exercise[]>([]);

  const filteredList = useFuzzySearchList({
    list: exerciseList,
    queryText,
    getText: (item) => [item.name],
    mapResultItem: ({ item, score, matches: [highlightRanges] }) => item,
  });

  async function getExercises() {
    const result = await db.getAllAsync<Exercise>("SELECT * FROM exercises;");

    setExerciseList(result);
  }

  async function getMuscleExercise(item: string) {
    const result = await db.getAllAsync<Exercise>(
      "SELECT * FROM exercises WHERE primaryMuscles=?;",
      [item]
    );
    setExerciseList(result);
  }

  function handlePress(item: Exercise) {
    if (type === "Exercise Details") {
      navigation.navigate("ExerciseDetails", {
        name: item.name,
        force: item.force,
        level: item.level,
        mechanic: item.mechanic,
        equipment: item.equipment,
        category: item.category,
        instructions: item.instructions,
        primaryMuscles: item.primaryMuscles,
      });
    } else if (type === "Add Exercise") {
      navigation.navigate("EditRoutine", { id, exercise_id: item.id });
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
