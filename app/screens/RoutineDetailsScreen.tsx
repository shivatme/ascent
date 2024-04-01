import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList, Pressable } from "react-native";
import ListItem from "../components/ListItem";
import DBRoutines from "../database/routines";
import { Exercise } from "../types";
import Button1 from "../components/Button1";

interface RoutineDetailsScreenProps {
  route: any;
  navigation: any;
}

function RoutineDetailsScreen({
  route,
  navigation,
}: RoutineDetailsScreenProps): JSX.Element {
  const { id } = route.params;
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    getRoutineExercises(id);
  }, []);

  async function getRoutineExercises(routine_id: string) {
    const result = await DBRoutines.getRoutineExercises(routine_id);
    setExercises(result);
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
          title="Start"
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
            navigation.navigate("EditRoutine", {
              id: id,
            })
          }
          title="Edit"
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

export default RoutineDetailsScreen;
