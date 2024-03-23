import { useSQLiteContext } from "expo-sqlite/next";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Button,
  FlatList,
  Pressable,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ListItem from "../components/ListItem";

interface RoutineDetailsScreenProps {
  route: any;
  navigation: any;
}
interface Exercise {
  name: string;
}

function RoutineDetailsScreen({
  route,
  navigation,
}: RoutineDetailsScreenProps): JSX.Element {
  const db = useSQLiteContext();

  const { id, exercise_id } = route.params;
  // console.log(id);

  const [exercises, setExercises] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getRoutineExercises(id);
  }, []);

  async function getRoutineExercises(item: string) {
    // console.log(id);
    const result = await db.getAllAsync<Exercise>(
      `SELECT name
      FROM routine_exercises
      JOIN exercises
          ON routine_exercises.exercise_id=exercises.id
          WHERE routine_id=?;`,
      // "SELECT * FROM routine_exercises "
      [item]
    );
    console.log(result);
    setExercises(result);
  }

  if (exercise_id) {
    addExercise(exercise_id);
  }
  async function addExercise(exercise_id: string) {
    // if (currentRoutineName) {
    //   try
    // console.log(id, "adaaaaa");

    const result = await db.runAsync(
      `INSERT INTO routine_exercises (routine_id, exercise_id) VALUES (?, ?)`,
      [id, exercise_id]
    );
    // console.log(result);
    setModalVisible(false);
  }
  return (
    <View style={styles.container}>
      <Text>{id}</Text>
      {exercises.length !== 0 ? (
        <>
          <View>
            <FlatList
              data={exercises}
              renderItem={({ item }) => (
                <ListItem title={item.name} id={item.name} />
              )}
            />
          </View>
        </>
      ) : (
        <>
          <Pressable
            onPress={() => console.log("Pressed")}
            style={styles.addExercises}
          >
            <Text>Add Exercises</Text>
          </Pressable>
        </>
      )}
      <View
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: "grey",
          width: 80,
          height: 80,
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("MuscleGroups", {
              type: "Add Exercise",
              id: id,
            })
          }
        >
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
      {/* <Modal visible={modalVisible}>
        <Button title="Submit" onPress={addRoutine} />
      </Modal> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181c1f",
  },
  addExercises: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "grey",
    height: 50,
  },
});

export default RoutineDetailsScreen;
