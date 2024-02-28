import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Chrome from "../components/Chrome";

interface HomeScreenProps {}
function HomeScreen(props: HomeScreenProps): JSX.Element {
  return (
    <Screen style={styles.container}>
      <View style={styles.searchBar}>
        <MaterialCommunityIcons name="magnify" size={24} color="white" />
        <AppText>Exercise database</AppText>
        <View>
          <AppText>..</AppText>
        </View>
      </View>
      <Chrome />
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
