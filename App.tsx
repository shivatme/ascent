import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./app/navigation/AppNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import * as SQLite from "expo-sqlite/next";
import {
  SQLiteProvider,
  useSQLiteContext,
  type SQLiteDatabase,
} from "expo-sqlite/next";

import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import { Suspense, useEffect, useState } from "react";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const loadDatabase = async () => {
    const dbName = "Ascent.db";
    const dbAsset = require("./app/assets/db/Ascent.db");
    const dbUri = Asset.fromModule(dbAsset).uri;

    const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

    const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
    // if (fileInfo.exists) {
    //   // Database file exists, delete it
    //   await FileSystem.deleteAsync(dbFilePath);
    // }

    // Create directory if it doesn't exist
    if (!fileInfo.exists) {
      await FileSystem.makeDirectoryAsync(
        `${FileSystem.documentDirectory}SQLite`,
        { intermediates: true }
      );

      // Download the new database file
      await FileSystem.downloadAsync(dbUri, dbFilePath);
    }
  };

  useEffect(() => {
    loadDatabase()
      .then(() => {
        console.log("Database Loaded Successfully!");
        setIsLoading(false);
      })
      .catch((e) => console.log(e));
    // Delete();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Suspense fallback={<Loading />}>
          <SQLiteProvider databaseName="Ascent.db" useSuspense>
            <StatusBar style="dark" />
            <AppNavigator />
          </SQLiteProvider>
        </Suspense>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
