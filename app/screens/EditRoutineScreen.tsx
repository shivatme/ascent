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
import ListItem3 from "../components/ListItem3";

interface EditRoutineScreenProps {
  route: any;
  navigation: any;
}
interface Exercise {
  name: string;
  sets_data: string;
}

function EditRoutineScreen({
  route,
  navigation,
}: EditRoutineScreenProps): JSX.Element {
  const db = useSQLiteContext();

  const { id, exercise_id } = route.params;

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getRoutineExercises(id);
  }, []);

  async function getRoutineExercises(item: string) {
    const result = await db.getAllAsync<Exercise>(
      `SELECT name, sets_data
      FROM routine_exercises
      JOIN exercises
          ON routine_exercises.exercise_id=exercises.id
          WHERE routine_id=?;`,
      // "SELECT * FROM routine_exercises "
      [item]
    );
    // console.log(result[7].s);
    setExercises(result);
  }

  if (exercise_id) {
    addExercise(exercise_id);
  }
  async function addExercise(exercise_id: string) {
    const result = await db.runAsync(
      `INSERT INTO routine_exercises (routine_id, exercise_id, sets_data) VALUES (?, ?, ?)`,
      [id, exercise_id, '{"set1": 8, "set2": 8, "set3": 8}']
    );
    setModalVisible(false);
  }
  const a = JSON.parse(
    '[{"reps": 8, "weight": 50}, {"reps": 8, "weight": 50}, {"reps": 8, "weight": 50}]'
  );

  console.log(a[0], "sdsd");
  return (
    <View style={styles.container}>
      <Text>{id}</Text>
      {exercises.length !== 0 ? (
        <>
          <View>
            <FlatList
              data={exercises}
              renderItem={({ item }) => (
                <ListItem3
                  name={item.name}
                  id={item.name}
                  sets_data={item.sets_data}
                />
              )}
            />
          </View>
        </>
      ) : (
        <>
          <Pressable
            onPress={() =>
              navigation.navigate("MuscleGroups", {
                type: "Add Exercise",
                id: id,
              })
            }
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
      <View
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
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
            navigation.navigate("RoutineDetails", {
              // type: "Add Exercise",
              id: id,
            })
          }
        >
          <Text>Save</Text>
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

export default EditRoutineScreen;
