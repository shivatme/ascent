import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Pressable,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import AppText from "../components/AppText";
import ListItem2 from "../components/ListItem2";
import CreateRoutine from "../components/CreateRoutine";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import DBRoutines from "../database/routines";
import { Routine } from "../types";
import Button1 from "../components/Button1";

const screenHeight = Dimensions.get("window").height;

interface RoutinesScreenProps {
  navigation: any;
}

function RoutinesScreen({ navigation }: RoutinesScreenProps): JSX.Element {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const addRoutine = async (routine: string, day: string) => {
    const result = await DBRoutines.addRoutine(routine, day);
    let existingRoutines = [...routines];
    existingRoutines.push({
      id: routine,
      name: routine,
      day: day,
    });
    setRoutines(existingRoutines);
    setModalVisible(false);
    navigation.navigate("EditRoutine", { id: routine });
  };

  const deleteRoutine = async (routine: Routine) => {
    try {
      const result = await DBRoutines.deleteRoutine(routine);
      console.log(`Routine with ID ${routine.id} removed successfully`);
      const updatedRoutines = routines.filter((rout) => rout.id !== routine.id);
      setRoutines(updatedRoutines);
    } catch (error) {
      console.error(`Error removing routine with ID ${routine.id}:`, error);
      throw error;
    }
  };
  const getRoutines = async () => {
    const result: Routine[] = await DBRoutines.getRoutines();
    setRoutines(result);
  };

  const handleDelete = (item: Routine) => {
    Alert.alert(
      "Alert Title",
      `Are you sure you want to delete ${item.name} routine`,
      [
        {
          text: "Yes",
          onPress: () => deleteRoutine(item),
        },
        { text: "No", onPress: () => console.log("OK Pressed") },
      ]
    );
  };

  useEffect(() => {
    getRoutines();
  }, []);

  return (
    <Screen style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("MuscleGroups", {
            type: "Exercises",
            id: null,
          })
        }
      >
        <View style={styles.searchBar}>
          <MaterialCommunityIcons name="magnify" size={24} color="white" />
          <AppText>Exercise database</AppText>
          <View>
            <AppText>..</AppText>
          </View>
        </View>
      </TouchableOpacity>
      {routines.map((routine) => (
        <Pressable
          key={routine.id}
          onPress={() =>
            navigation.navigate("RoutineDetails", { id: routine.id })
          }
        >
          <ListItem2
            id={routine.id}
            title={routine.name}
            key={routine.id}
            label={routine.day ? routine.day : "Sun"}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(routine)} />
            )}
          />
        </Pressable>
      ))}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <CreateRoutine
          onSubmit={(routine: string, day: string) => addRoutine(routine, day)}
          onClose={() => setModalVisible(false)}
        />
      </Modal>

      <View
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
        }}
      >
        <Button1 onPress={() => setModalVisible(true)} title="Add" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#181c1f",
    flex: 1,
  },
  searchBar: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 40,
    borderRadius: 150,
    margin: 10,
    paddingHorizontal: 20,
    backgroundColor: "#212a31",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContainer1: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0)", // Semi-transparent background
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: screenHeight / 2, // Half the screen height
  },
});

export default RoutinesScreen;
