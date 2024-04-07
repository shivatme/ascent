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
import CreateRoutine from "../features/CreateRoutine";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import { Muscles, Routine } from "../types";
import Button1 from "../components/Button1";
import {
  addNewRoutine,
  deleteRoutine,
  getRoutines,
  routineStatus,
  selectAllRoutines,
} from "../redux/routineSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { nanoid } from "@reduxjs/toolkit";
import { useSQLiteContext } from "expo-sqlite/next";

const screenHeight = Dimensions.get("window").height;

interface RoutinesScreenProps {
  navigation: any;
}

function RoutinesScreen({ navigation }: RoutinesScreenProps): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useAppDispatch();
  const routines: Routine[] = useAppSelector(selectAllRoutines);
  const routinesStatus = useAppSelector(routineStatus);

  const handleAddRoutine = async (name: string, day: string) => {
    const id = nanoid();
    dispatch(addNewRoutine({ id, name, day }));

    setModalVisible(false);
    navigation.navigate("RoutineDetails", { routine_id: id });
  };

  const handleDeleteRoutine = (routine: Routine) => {
    Alert.alert(
      "Alert Title",
      `Are you sure you want to delete ${routine.name} routine`,
      [
        { text: "No", onPress: () => console.log("OK Pressed") },
        {
          text: "Yes",
          onPress: () => dispatch(deleteRoutine(routine)),
        },
      ]
    );
  };

  useEffect(() => {
    if (routinesStatus === "idle") {
      dispatch(getRoutines());
    }
  }, [routinesStatus, dispatch]);

  return (
    <Screen style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("MuscleGroups", {
            type: "Exercises",
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
            navigation.navigate("RoutineDetails", { routine_id: routine.id })
          }
        >
          <ListItem2
            id={routine.id}
            title={routine.name}
            key={routine.id}
            label={routine.day ? routine.day : "Sun"}
            renderRightActions={() => (
              <ListItemDeleteAction
                onPress={() => handleDeleteRoutine(routine)}
              />
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
          onSubmit={(routine: string, day: string) =>
            handleAddRoutine(routine, day)
          }
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
