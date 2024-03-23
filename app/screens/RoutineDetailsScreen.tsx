import { useSQLiteContext } from "expo-sqlite/next";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Modal, Button, FlatList } from "react-native";
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

  const { id } = route.params;

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getRoutineExercises(id);
  }, []);

  async function getRoutineExercises(item: string) {
    const result = await db.getAllAsync<Exercise>(
      `SELECT name
      FROM routine_exercises
      JOIN exercises 
          ON routine_exercises.exercise_id=exercises.id
          WHERE routine_id=?;`,
      [item]
    );
    console.log(result);
    setExercises(result);
  }
  async function addRoutine() {
    // if (currentRoutineName) {
    //   try
    const result = await db.runAsync(
      `INSERT INTO routine_exercises (routine_id, exercise_id) VALUES (?, ?)`,
      [id, "Air_Bike"]
    );
    setModalVisible(false);
  }
  return (
    <View style={styles.container}>
      <Text>{id}</Text>
      {exercises && (
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
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={modalVisible}>
        <Button title="Submit" onPress={addRoutine} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181c1f",
  },
});

export default RoutineDetailsScreen;
