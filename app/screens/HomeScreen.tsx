import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SortableList from "../components/Chrome/SortableList";

import ListItem from "../components/ListItem";
import ListItem2 from "../components/ListItem2";

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
    id: "google",
    uri: "https://google.com",
  },

  {
    id: "expo",
    uri: "https://expo.io",
  },
  {
    id: "instagram",
    uri: "https://instagram.com/",
  },
  {
    id: "reanimated",
    uri: "https://docs.swmansion.com/react-native-reanimated/",
  },
  {
    id: "github",
    uri: "https://github.com",
  },
  {
    id: "rnnavigation",
    uri: "https://reactnavigation.org/",
  },
  {
    id: "youtube",
    uri: "https://youtube.com",
  },
  {
    id: "twitter",
    uri: "https://twitter.com",
  },
  {
    id: "linkedin",
    uri: "https://www.linkedin.com",
  },
  {
    id: "wikipedia",
    uri: "https://www.wikipedia.org",
  },
  {
    id: "amazon",
    uri: "https://www.amazon.com",
  },
  {
    id: "ebay",
    uri: "https://www.ebay.com",
  },
  {
    id: "netflix",
    uri: "https://www.netflix.com",
  },
  {
    id: "apple",
    uri: "https://www.apple.com",
  },
  {
    id: "microsoft",
    uri: "https://www.microsoft.com",
  },
  {
    id: "yahoo",
    uri: "https://www.yahoo.com",
  },
  {
    id: "bing",
    uri: "https://www.bing.com",
  },
  {
    id: "stackoverflow",
    uri: "https://stackoverflow.com",
  },
  {
    id: "wordpress",
    uri: "https://wordpress.com",
  },
  {
    id: "imdb",
    uri: "https://www.imdb.com",
  },
  {
    id: "craigslist",
    uri: "https://www.craigslist.org",
  },
];
