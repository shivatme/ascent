import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList, TextInput } from "react-native";
import { useFuzzySearchList, Highlight } from "@nozbe/microfuzz/react";
import createFuzzySearch from "@nozbe/microfuzz";
import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import { useSQLiteContext } from "expo-sqlite/next";

interface ExercisesScreenProps {}
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
// const exerciseData: Exercise[] = require("../assets/json/exercises.json");

function ExercisesScreen(props: ExercisesScreenProps): JSX.Element {
  const [queryText, setSearchQuery] = useState("");
  const [exerciseList, setExerciseList] = useState<Exercise[]>([]);
  const [muscleGroups, setMuscleGroups] = useState([]);
  // let list: Exercise[] = exerciseData;

  const filteredList = useFuzzySearchList({
    list: exerciseList,
    queryText,
    getText: (item) => [item.name],
    mapResultItem: ({ item, score, matches: [highlightRanges] }) => item,
  });

  const db = useSQLiteContext();
  console.log(db.databaseName);
  // console.log("sqlite version", db.getSync("SELECT sqlite_version()"));
  async function getExercises() {
    console.log("called");
    const result = await db.getAllAsync<Exercise>("SELECT * FROM exercises;");
    // console.log(result);

    setExerciseList(result);
  }
  const getMuscleGroups = async () => {
    const result = await db.getAllAsync(
      "SELECT DISTINCT primaryMuscles FROM exercises;"
    );

    const muscleGroups = result.map((item) => item.primaryMuscles);
    setMuscleGroups(muscleGroups);
  };

  useEffect(() => {
    getExercises();
    getMuscleGroups();
  }, []);
  useEffect(() => {
    console.log(muscleGroups);
  }, [muscleGroups]);

  return (
    <Screen style={styles.container}>
      <View style={{ padding: 5 }}>
        <FlatList
          data={muscleGroups}
          // ListHeaderComponent={
          //   <TextInput
          //     style={styles.textInput}
          //     placeholder="Search"
          //     placeholderTextColor={"white"}
          //     onChangeText={setSearchQuery}
          //     value={queryText}
          //   />
          // }
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <>
              <ListItem title={item} id={item} />
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
    margin: 10,
    paddingHorizontal: 20,
    backgroundColor: "#212a31",
    alignItems: "center",
  },
});

export default ExercisesScreen;
