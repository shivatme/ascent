import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import AppNavigator from "./app/navigation/AppNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SystemUI from "expo-system-ui";

import * as SQLite from "expo-sqlite/next";
import {
  SQLiteProvider,
  useSQLiteContext,
  type SQLiteDatabase,
} from "expo-sqlite/next";

import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import { Suspense, useEffect, useState } from "react";
import WorkoutNavigator from "./app/navigation/WorkoutNavigator";

export default function App() {
  SystemUI.setBackgroundColorAsync("#181c1f");
  const [isLoading, setIsLoading] = useState(true);

  async function openDatabase() {
    if (
      !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite"))
        .exists
    ) {
      await FileSystem.makeDirectoryAsync(
        FileSystem.documentDirectory + "SQLite"
      );
    }
    await FileSystem.downloadAsync(
      Asset.fromModule(require("./app/assets/db/Ascent.db")).uri,
      FileSystem.documentDirectory + "SQLite/Ascent.db"
    );
  }
  // useEffect(() => {
  //   openDatabase();
  // }, []);

  // useEffect(() => {
  //   loadDatabase()
  //     .then(() => {
  //       console.log("Database Loaded Successfully!");
  //       setIsLoading(false);
  //     })
  //     .catch((e) => console.log(e));
  //   // Delete();
  // }, []);
  // useEffect(() => {
  //   checkFirstTimeOpen();
  // }, []);

  // const checkFirstTimeOpen = async () => {
  //   try {
  //     const isFirstTimeOpen = await AsyncStorage.getItem("isFirstTimeOpen");
  //     console.log(isFirstTimeOpen);
  //     if (isFirstTimeOpen === null) {
  //       // This is the first time the app is being opened
  //       // Call your function here
  //       loadDatabase();

  //       // Set the flag to indicate that the app has been opened before
  //       await AsyncStorage.setItem("isFirstTimeOpen", "false");
  //     }
  //   } catch (error) {
  //     console.error("Error checking first time open:", error);
  //   }
  // };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Suspense fallback={<Loading />}>
          <SQLiteProvider databaseName="Ascent.db" useSuspense>
            <StatusBar style="dark" />
            {/* <AppNavigator /> */}
            <WorkoutNavigator />
          </SQLiteProvider>
        </Suspense>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181c1f",
    alignItems: "center",
    justifyContent: "center",
  },
});

const Loading = () => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        // backgroundColor: "red",
      }}
    >
      <ActivityIndicator size={"large"} />
      <Text>Loading...</Text>
    </View>
  );
};

const loadDatabase = async () => {
  // const db=SQLite.openda
  const dbName = "Ascent.db";
  const dbAsset = require("./app/assets/db/Ascent.db");
  const dbUri = Asset.fromModule(dbAsset).uri;

  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
  if (fileInfo.exists) {
    // Database file exists, delete it
    await FileSystem.deleteAsync(dbFilePath);
  }

  // Create directory if it doesn't exist
  // if (!fileInfo.exists) {
  await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`, {
    intermediates: true,
  });

  // Download the new database file
  await FileSystem.downloadAsync(dbUri, dbFilePath);
  // }
};
