import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, Button } from "react-native";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SortableList from "../components/Chrome/SortableList";

import ListItem from "../components/ListItem";
import ListItem2 from "../components/ListItem2";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as SQLite from "expo-sqlite";
import { v4 as uuidv4 } from "uuid";

interface HomeScreenProps {
  navigation: any;
}
function HomeScreen({ navigation }: HomeScreenProps): JSX.Element {
  // const db = SQLite.openDatabase("UserData.db");
  const [isLoading, setIsLoading] = useState(true);
  const [routines, setRoutines] = useState([]);
  const [currentRoutineName, setCurrentroutineName] = useState("");

  const addRoutine = () => {
    if (currentRoutineName) {
      // console.log(currentRoutineName);
      // db.transaction((tx) => {
      //   tx.executeSql(
      //     `INSERT INTO routines (id, name) VALUES (?, ?)`,
      //     [currentRoutineName, currentRoutineName],
      //     (txObj, resultSet) => {
      //       console.log(currentRoutineName);
      console.log(currentRoutineName);
      //       setCurrentroutineName("");
      //     },
      //     (txObj, error) => {
      //       console.log(error);
      //       // console.log(currentRoutineName);
      //       return false;
      //     }
      //   );
      // });
    }
  };

  // let existingNames = [...routines];
  // existingNames.push({
  //   id: resultSet.insertId,
  //   name: currentRoutineName,
  // });
  // setRoutines(existingNames);

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
  return (
    <Screen style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Exercises")}>
        <View style={styles.searchBar}>
          <MaterialCommunityIcons name="magnify" size={24} color="white" />
          <AppText>Exercise database</AppText>
          <View>
            <AppText>..</AppText>
          </View>
        </View>
      </TouchableOpacity>
      <SortableList COL={1} height={70}>
        {tiles.map((tile) => (
          // <Tile
          //   onLongPress={() => true}
          //   key={tile.id}
          //   id={tile.id}
          //   uri={tile.uri}
          // />
          <ListItem2 id={tile.id} title={tile.uri} key={tile.id} />
        ))}
      </SortableList>
      <TouchableOpacity
        onPress={() => navigation.navigate("Analytics")}
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
        <Text>Add</Text>
      </TouchableOpacity>
      <TextInput
        placeholder="Name"
        value={currentRoutineName}
        onChangeText={setCurrentroutineName}
      />
      <Button title="Submit" onPress={addRoutine} />
      {/* <View>{showNames()}</View> */}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#181c1f",
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

export default HomeScreen;

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
