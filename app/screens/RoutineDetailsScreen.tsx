import React, { useEffect } from "react";
import { View, StyleSheet, Text, FlatList, Pressable } from "react-native";
import ListItem from "../components/ListItem";
import Button1 from "../components/Button1";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  getRoutineExercise,
  selectRoutineExercise,
  setEditRoutineExercise,
} from "../redux/routineExerciseSlice";

interface RoutineDetailsScreenProps {
  route: any;
  navigation: any;
}

function RoutineDetailsScreen({
  route,
  navigation,
}: RoutineDetailsScreenProps): JSX.Element {
  const { routine_id } = route.params;
  // console.log(routine_id);

  const dispatch = useAppDispatch();
  const routineId = useAppSelector((state) => state.routineExercises.routineId);
  // console.log(routineId, "sds");
  const exercises = useAppSelector(selectRoutineExercise);

  useEffect(() => {
    if (routineId !== routine_id) {
      console.log("Getting exercises for ", routine_id);
      dispatch(getRoutineExercise(routine_id));
    }
  }, [routineId, dispatch]);

  return (
    <View style={styles.container}>
      <Text>{routine_id}</Text>
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
            onPress={() => {
              dispatch(setEditRoutineExercise());
              navigation.navigate("MuscleGroups", {
                type: "Add Exercise",
                routine_id,
              });
            }}
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
              routine_id,
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
          onPress={() => {
            dispatch(setEditRoutineExercise());
            navigation.navigate("EditRoutine", {
              routine_id,
            });
          }}
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
