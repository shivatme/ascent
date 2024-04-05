import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList, Pressable } from "react-native";
import EditRoutineList from "../components/EditRoutineList";
import { Exercise } from "../types";
import DBRoutines from "../database/routines";
import Button1 from "../components/Button1";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  addExerciseSet,
  addRoutineExercise,
  getRoutineExercise,
  selectRoutineExercise,
  selectRoutineExerciseEdit,
  subtractExerciseSet,
} from "../redux/routineExerciseSlice";

interface EditRoutineScreenProps {
  route: any;
  navigation: any;
}

function EditRoutineScreen({
  route,
  navigation,
}: EditRoutineScreenProps): JSX.Element {
  const { id, exercise_id, exercise_name } = route.params;

  const dispatch = useAppDispatch();
  const exercises = useAppSelector(selectRoutineExerciseEdit);
  // console.log(typeof exercises[0].sets_data);

  useEffect(() => {
    if (exercise_id) {
      dispatch(
        addRoutineExercise({ routine_id: id, exercise_id, exercise_name })
      );
    }
  }, [exercise_id]);

  const onDelete = (item_id: string) => {
    console.log(item_id);
  };
  const handleSave = () => {
    navigation.navigate("RoutineDetails", {
      id: id,
    });
  };
  const addSet = (id: string) => {
    dispatch(addExerciseSet(id));
  };
  const subtractSet = (id: string) => {
    dispatch(subtractExerciseSet(id));
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
                  item={item}
                  onDelete={onDelete}
                  onPressPlus={addSet}
                  onPressMinus={subtractSet}
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
        <Button1 onPress={handleSave} title="Save" />
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
