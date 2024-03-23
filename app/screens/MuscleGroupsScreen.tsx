import { useSQLiteContext } from "expo-sqlite/next";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ListItem from "../components/ListItem";
import AppText from "../components/AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface MuscleGroupsScreenProps {
  navigation: any;
}
interface Muscles {
  primaryMuscles: string;
}

function MuscleGroupsScreen({
  navigation,
}: MuscleGroupsScreenProps): JSX.Element {
  const db = useSQLiteContext();

  const [muscleGroups, setMuscleGroups] = useState<string[]>([]);

  const getMuscleGroups = async () => {
    const result = await db.getAllAsync<Muscles>(
      "SELECT DISTINCT primaryMuscles FROM exercises;"
    );
    const muscleGroups = result.map((item) => item.primaryMuscles);
    setMuscleGroups(muscleGroups);
  };

  useEffect(() => {
    getMuscleGroups();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Exercises", { item: null })}
      >
        <View style={styles.searchBar}>
          <MaterialCommunityIcons name="magnify" size={24} color="white" />
          <AppText>Exercise List</AppText>
          <View>
            <AppText>..</AppText>
          </View>
        </View>
      </TouchableOpacity>

      <FlatList
        data={muscleGroups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <>
            <Pressable
              key={item}
              onPress={() => navigation.navigate("Exercises", { item: item })}
            >
              <ListItem title={item} id={item} />
            </Pressable>
          </>
        )}
      />
    </View>
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
  searchBar: {
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

export default MuscleGroupsScreen;
