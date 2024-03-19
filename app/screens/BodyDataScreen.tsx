import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, Button } from "react-native";
import Screen from "../components/Screen";
import * as SQLite from "expo-sqlite";

interface BodyDataScreenProps {}

function BodyDataScreen(props: BodyDataScreenProps): JSX.Element {
  const db = SQLite.openDatabase("exercise.db");
  const [isLoading, setIsLoading] = useState(true);
  const [names, setNames] = useState([]);
  const [currentName, setCurrentName] = useState("");

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS names ( id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)",
        null,
        (txObj, resultSet) => console.log("xas")
      ),
        (txObj, error) => console.log(error, "ssd");
    });

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM names",
        null,
        (txObj, resultSet) => setNames(resultSet.rows._array),
        (txObj, error) => console.log(error, "asa")
      );
    });

    setIsLoading(false);
  }, []);

  const addName = () => {
    if (currentName) {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO names (name) values (?) ",
          [currentName],
          (txObj, resultSet) => {
            let existingNames = [...names];
            existingNames.push({ id: resultSet.insertId, name: currentName });
            setNames(existingNames);
            setCurrentName(""), (txtObj, error) => console.log(error);
          }
        );
      });
    }
  };

  const deleteName = (id: number) => {
    console.log(id, "aaa");
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM names WHERE id = ? ",
        [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingNames = [...names].filter((name) => name.id !== id);

            console.log(id, "Dfs");
            setNames(existingNames);
          }
        },
        (txObj, error) => {
          console.log(error);
          console.log(id);
        }
      );
    });
  };

  const showNames = () => {
    return names.map((name, index) => {
      return (
        <View key={index} style={{ flexDirection: "row" }}>
          <Text>{name.name}</Text>
          <Button title="Delete" onPress={() => deleteName(name.id)} />
        </View>
      );
    });
  };
  return (
    <Screen style={styles.container}>
      <Text> Body Data</Text>
      <TextInput
        placeholder="Name"
        value={currentName}
        onChangeText={setCurrentName}
      />
      <Button title="Submit" onPress={addName} />
      <View>{showNames()}</View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default BodyDataScreen;
