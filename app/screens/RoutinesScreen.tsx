import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  Modal,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite/next";

import Screen from "../components/Screen";
import AppText from "../components/AppText";
import ListItem2 from "../components/ListItem2";

interface RoutinesScreenProps {
  navigation: any;
}
interface Routine {
  id: string;
  name: string;
}
function RoutinesScreen({ navigation }: RoutinesScreenProps): JSX.Element {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRoutineName, setCurrentroutineName] = useState("");

  const db = useSQLiteContext();

  const addRoutine = async () => {
    if (currentRoutineName) {
      const result = await db.runAsync(
        `INSERT INTO routines (id, name) VALUES (?, ?)`,
        [currentRoutineName, currentRoutineName]
      );
      let existingRoutines = [...routines];
      existingRoutines.push({
        id: currentRoutineName,
        name: currentRoutineName,
      });
      setRoutines(existingRoutines);
      setModalVisible(false);
    }
  };

  const getRoutines = async () => {
    const result = await db.getAllAsync<Routine>("SELECT * FROM routines;");
    console.log(result);
    setRoutines(result);
  };

  useEffect(() => {
    getRoutines();
  }, []);

  return (
    <Screen style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("MuscleGroups")}>
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
          <ListItem2 id={routine.id} title={routine.name} key={routine.id} />
        </Pressable>
      ))}

      <Modal visible={modalVisible}>
        <TextInput
          placeholder="Name"
          value={currentRoutineName}
          onChangeText={setCurrentroutineName}
        />
        <Button title="Submit" onPress={addRoutine} />
      </Modal>
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
});

export default RoutinesScreen;

{
  /* <SortableList COL={1} height={70}>
        {tiles.map((tile) => (
          // <Tile
          //   onLongPress={() => true}
          //   key={tile.id}
          //   id={tile.id}
          //   uri={tile.uri}
          // />
          <ListItem2 id={tile.id} title={tile.uri} key={tile.id} />
        ))}
      </SortableList> */
}

const tiles = [
  {
    id: "push",
    uri: "Push",
  },

  {
    id: "Pull",
    uri: "Pull",
  },
  {
    id: "Legs",
    uri: "Legs",
  },
  {
    id: "reanimated",
    uri: "Arms",
  },
  {
    id: "github",
    uri: "Chest",
  },
  {
    id: "rnnavigation",
    uri: "back",
  },
];

// const deleteRoutine = (id: number) => {
//   console.log(id, "aaa");
//   db.transaction((tx) => {
//     tx.executeSql(
//       "DELETE FROM names WHERE id = ? ",
//       [id],
//       (txObj, resultSet) => {
//         if (resultSet.rowsAffected > 0) {
//           let existingNames = [...names].filter((name) => name.id !== id);

//           console.log(id, "Dfs");
//           setNames(existingNames);
//         }
//       },
//       (txObj, error) => {
//         console.log(error);
//         console.log(id);
//       }
//     );
//   });
// };
