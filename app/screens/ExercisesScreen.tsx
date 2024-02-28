import React, { useState } from "react";
import { View, StyleSheet, Text, FlatList, TextInput } from "react-native";
import { useFuzzySearchList, Highlight } from "@nozbe/microfuzz/react";
import createFuzzySearch from "@nozbe/microfuzz";
import Screen from "../components/Screen";
import ListItem from "../components/ListItem.tsx";

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
const exerciseData: Exercise[] = require("../assets/json/exercises.json");

function ExercisesScreen(props: ExercisesScreenProps): JSX.Element {
  const [queryText, setSearchQuery] = useState("");
  const list: Exercise[] = exerciseData;

  const filteredList = useFuzzySearchList({
    list,
    queryText,
    getText: (item) => [item.name],
    mapResultItem: ({ item, score, matches: [highlightRanges] }) => item,
  });
  // console.log(filteredList);

  return (
    <Screen style={styles.container}>
      <View style={{ padding: 5 }}>
        <FlatList
          data={filteredList}
          ListHeaderComponent={
            <TextInput
              style={styles.textInput}
              placeholder="Search"
              placeholderTextColor={"white"}
              onChangeText={setSearchQuery}
              value={queryText}
            />
          }
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <>
              <ListItem title={item.name} />
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
