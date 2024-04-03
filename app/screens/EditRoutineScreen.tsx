import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList, Pressable } from "react-native";
import EditRoutineList from "../components/EditRoutineList";
import { Exercise } from "../types";
import DBRoutines from "../database/routines";
import Button1 from "../components/Button1";

interface EditRoutineScreenProps {
  route: any;
  navigation: any;
}

function EditRoutineScreen({
  route,
  navigation,
}: EditRoutineScreenProps): JSX.Element {
  const { id, exercise_id } = route.params;

  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    getRoutineExercises(id);
  }, []);

  async function getRoutineExercises(routine_id: string) {
    const result = await DBRoutines.getRoutineExercises(routine_id);
    setExercises(result);
  }

  if (exercise_id) {
    addExercise(id, exercise_id);
  }
  async function addExercise(routine_id: string, exercise_id: string) {
    const result = await DBRoutines.addRoutineExercise(routine_id, exercise_id);
  }

  const onDelete = (item_id: string) => {
    console.log(item_id);
  };

  return (
    <View style={styles.container}>
      <Text>{id}</Text>
      {exercises.length !== 0 ? (
        <>
          <View>
            <FlatList
              data={exercises}
              renderItem={({ item }) => (
                <EditRoutineList
                  name={item.name}
                  id={item.name}
                  sets_data={item.sets_data}
                  onDelete={onDelete}
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
        }}
      >
        <Button1
          onPress={() =>
            navigation.navigate("MuscleGroups", {
              type: "Add Exercise",
              id: id,
            })
          }
          title="Add"
        />
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
        }}
      >
        <Button1
          onPress={() =>
            navigation.navigate("RoutineDetails", {
              id: id,
            })
          }
          title="Save"
        />
      </View>
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
